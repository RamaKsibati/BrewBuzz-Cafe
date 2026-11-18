import fetch from "node-fetch";
import Cart from "../models/Cart.mjs";
import Business from "../models/Business.mjs";
import Order from "../models/Order.mjs";
import { generateReceiptPdf } from "../services/pdfService.mjs";
import { uploadReceiptToS3 } from "../services/s3Service.mjs";
import { sendEmailWithAttachment } from "../services/emailService.mjs";

export async function placeOrder(req, res) {
    try {
        const user_id = req.user.id;
        const { business_id } = req.body;

        // Fetch cart items
        const cartItems = await Cart.findAll({ where: { user_id, business_id } });

        if (cartItems.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // Prepare order data for Clover
        const orderItems = cartItems.map((item) => ({
            id: item.item_id,
            name: item.item_name,
            price: item.price * 100, // Convert price to cents
            quantity: item.quantity,
            modifiers: item.modifiers || [],
        }));

        const business = await Business.findByPk(business_id);
        if (!business) {
            return res.status(404).json({ message: "Business not found" });
        }

        const headers = {
            Authorization: `Bearer ${business.clover_api_token}`,
            "Content-Type": "application/json",
        };

        const orderResponse = await fetch(
            `https://www.clover.com/v3/merchants/${business.merchant_id}/orders`,
            {
                method: "POST",
                headers,
                body: JSON.stringify({ items: orderItems }),
            }
        );

        if (!orderResponse.ok) {
            throw new Error("Failed to place order on Clover");
        }

        const orderData = await orderResponse.json();

        // Calculate total price
        const total_price = cartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        // Save order in the database
        const newOrder = await Order.create({
            user_id,
            business_id,
            total_price,
            items: orderItems,
            receipt_url: null, // Placeholder for receipt URL
        });

        // Generate receipt in memory
        const receiptBuffer = await generateReceiptPdf(newOrder);

        // Upload receipt to S3
        const receiptUrl = await uploadReceiptToS3(
            {
                buffer: receiptBuffer,
                originalname: `receipt-${newOrder.id}.pdf`,
                mimetype: "application/pdf",
            },
            "Receipts" // Save receipts in the "Receipts" folder
        );

        // Update the order with receipt URL
        newOrder.receipt_url = receiptUrl;
        await newOrder.save();

        // Send receipt via email
        await sendEmailWithAttachment(
            req.user.email,
            "Your Order Receipt",
            "Thank you for your order! Your receipt is attached.",
            receiptUrl // Use receipt URL as an attachment reference
        );

        // Clear cart after successful order
        await Cart.destroy({ where: { user_id, business_id } });

        res.status(200).json({
            message: "Order placed successfully",
            order: newOrder,
        });
    } catch (error) {
        console.error("Error placing order:", error.message);
        res.status(500).json({ message: "Failed to place order" });
    }
}
