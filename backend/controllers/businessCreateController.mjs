import Business from "../models/Business.mjs";
import { uploadFileToS3 } from "../services/s3Service.mjs";


export async function createBusiness(req, res) {
    try {
        const { name, category, description, location, phone_number, clover_api_token, merchant_id } = req.body;

        if (!name || !location || !phone_number || !clover_api_token || !merchant_id) {
            return res.status(400).json({ message: "All required fields must be provided" });
        }

         // Upload cover photo to S3
         let coverPhotoUrl = "./uploads/default-image.jpeg"; // Default image
         if (req.file) {
            try {
                coverPhotoUrl = await uploadFileToS3(req.file);
            } catch (error) {
                console.error("Error uploading cover photo:", error.message);
                return res.status(500).json({ message: "Failed to upload cover photo" });
            }
        }

        const business = await Business.create({
            user_id: req.user.id, // Populated by `authenticateToken` middleware
            name,
            description,
            location,
            phone_number,
            cover_photo: coverPhotoUrl,
            clover_api_token,
            merchant_id,
        }); 
        res.status(201).json({ message: "Business created successfully", business });
    } catch (error) {   
        console.error("Error creating business:", error.message);
        res.status(500).json({ message: "Server error" });
    }
}