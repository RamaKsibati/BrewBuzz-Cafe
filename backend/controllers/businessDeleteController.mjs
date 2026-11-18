import Business from "../models/Business.mjs";


export async function deleteBusiness(req, res) {
    const { id } = req.params;

    try {
        const business = await Business.findByPk(id);

        if (!business) {
            return res.status(404).json({ message: "Business not found." });
        }

        if (business.user_id !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to delete this business." });
        }

        business.status = "deleted"; // Mark as deleted
        await business.save();

        res.status(200).json({ message: "Business deleted successfully." });
    } catch (error) {
        console.error("Error deleting business:", error.message);
        res.status(500).json({ message: "Server error while deleting the business." });
    }
}

