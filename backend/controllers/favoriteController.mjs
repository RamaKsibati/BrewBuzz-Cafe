import Favorite from "../models/Favorite.mjs";
import Business from "../models/Business.mjs";
import Review from "../models/Review.mjs";
import sequelize from "../config/sequelize.mjs";

// Toggle favorite
export async function toggleFavorite(req, res) {
    try {
        const { businessId } = req.params;
        const user_id = req.user.id;

        // Check if the business exists
        const businessExists = await Business.findByPk(businessId);
        if (!businessExists) {
            return res.status(404).json({ message: "Business not found" });
        }

        // Check if the favorite already exists
        const existingFavorite = await Favorite.findOne({ where: { user_id: user_id, businessId } });

        if (existingFavorite) {
            // Remove from favorites
            await existingFavorite.destroy();
            res.status(200).json({ message: "Removed from favorites" });
        } else {
            // Add to favorites
            await Favorite.create({ user_id: user_id, businessId });
            res.status(201).json({ message: "Added to favorites" });
        }
    } catch (error) {
        console.error("Error toggling favorite:", error.message);
        res.status(500).json({ message: "Failed to toggle favorite" });
    }
}


//get all favorites
export async function getFavorites(req, res) {
    try {
        const user_id = req.user.id;

        // Fetch all favorite businesses for the user with aggregated review data
        const favorites = await Business.findAll({
            attributes: [
                "id",
                "cover_photo",
                "name",
                "location",
                "phone_number",
                "description",
                [
                    sequelize.fn("COALESCE", sequelize.fn("AVG", sequelize.col("Reviews.rating")), 0),
                    "averageRating",
                ],
                [
                    sequelize.fn("COUNT", sequelize.col("Reviews.id")),
                    "reviewCount",
                ],
            ],
            include: [
                {
                    model: Favorite,
                    where: { user_id }, // Only fetch businesses that are favorited
                    attributes: [], // No need to include favorite-specific attributes
                },
                {
                    model: Review,
                    attributes: [], // Exclude individual reviews but allow aggregation
                },
            ],
            raw: true,
            group: ["Business.id"], // Group by business ID for aggregation
        });

        res.status(200).json({
            message: "Favorites retrieved successfully",
            favorites,
        });
  
    } catch (error) {
        console.error("Error fetching favorites:", error.message);
        res.status(500).json({ message: "Failed to fetch favorites" });
    }
}
