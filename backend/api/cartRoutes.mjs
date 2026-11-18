// routes/cartRoutes.mjs
import express from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cartController.mjs";
import { authenticateToken } from "../middleware/authMiddleware.mjs";

const router = express.Router();

// Add an item to the cart
router.post("/api/cart", authenticateToken, addToCart);

// View user's cart
router.get("/api/cart", authenticateToken, getCart);

// Remove an item from the cart
router.delete("/api/cart/:item_id", authenticateToken, removeFromCart);

export default router;
