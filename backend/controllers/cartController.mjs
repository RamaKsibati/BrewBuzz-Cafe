// controllers/cartController.mjs
import Cart from "../models/Cart.mjs";

// Add item to cart
export async function addToCart(req, res) {
    try {
        const { business_id, item_id, item_name, price, quantity, modifiers } = req.body;
        const user_id = req.user.id;

        // Check if item already exists in the cart
        const existingItem = await Cart.findOne({ where: { user_id, item_id, business_id } });

        if (existingItem) {
            // Update quantity and modifiers if the item already exists
            existingItem.quantity += quantity;
            existingItem.modifiers = modifiers || existingItem.modifiers;
            await existingItem.save();
        } else {
            // Add new item to cart
            await Cart.create({ user_id, business_id, item_id, item_name, price, quantity, modifiers });
        }

        res.status(201).json({ message: "Item added to cart successfully" });
    } catch (error) {
        console.error("Error adding to cart:", error.message);
        res.status(500).json({ message: "Failed to add item to cart" });
    }
}

// View cart
export async function getCart(req, res) {
    try {
        const user_id = req.user.id;

        const cartItems = await Cart.findAll({ where: { user_id } });
        res.status(200).json({ cart: cartItems });
    } catch (error) {
        console.error("Error fetching cart:", error.message);
        res.status(500).json({ message: "Failed to fetch cart" });
    }
}

// Remove item from cart
export async function removeFromCart(req, res) {
    try {
        const { item_id } = req.params;
        const user_id = req.user.id;

        const item = await Cart.findOne({ where: { user_id, item_id } });
        if (!item) {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        await item.destroy();
        res.status(200).json({ message: "Item removed from cart" });
    } catch (error) {
        console.error("Error removing from cart:", error.message);
        res.status(500).json({ message: "Failed to remove item from cart" });
    }
}
