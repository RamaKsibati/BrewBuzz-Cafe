// controllers/menuController.mjs
import { fetchBusinessDataFromClover } from "../services/cloverService.mjs";
import Business from "../models/Business.mjs";

export async function getMenu(req, res) {
    try {
        const { business_id } = req.params;

        // Fetch business details from the database
        const business = await Business.findOne({
            where: { id: business_id },
            attributes: ["clover_api_token", "merchant_id"],
        });

        if (!business) {
            return res.status(404).json({ message: "Business not found" });
        }

        // Fetch menu data from Clover
        const cloverData = await fetchBusinessDataFromClover(
            business.clover_api_token,
            business.merchant_id
        );

        if (!cloverData || !cloverData.menu) {
            return res.status(200).json({ menu: [] }); // Return empty array instead of an error
        }

        // Transform menu data to match frontend expectations
        const formattedMenu = cloverData.menu.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price ? parseFloat(item.price) : 0, // Ensure correct price format
            image: item.image 
                ? `/api/businesses/:business_id/menu${item.image}` 
                : "https://via.placeholder.com/100", // Default image if missing
            category: item.category || "Uncategorized",
            modifiers: item.modifiers || [],
        }));

        res.status(200).json({ menu: formattedMenu });
    } catch (error) {
        console.error("Error fetching menu:", error.message);
        res.status(500).json({ message: "Failed to fetch menu" });
    }
}

