// controllers/userController.mjs

import User from "../models/User.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Function to handle user signup
export async function signUp(req, res) {
    try {
        const { full_name, email, password, state, zipcode, user_category } = req.body;

        // Validate required fields
        if (!full_name || !email || !password || !state || !zipcode || !user_category) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the user category is valid
        if (!["Customer", "Business", "Admin"].includes(user_category)) {
            return res.status(400).json({ message: "Invalid user category" });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });     
        }


        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({
            full_name,
            email,
            password: hashedPassword,
            state,
            zipcode,
            user_category,
        });

        // Return success response
        res.status(201).json({
            message: "User created successfully",
            
            user: {
                id: newUser.id,
                email: newUser.email,
                user_category: newUser.user_category,
            },
        });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Server error" });
    }
}


export async function signIn(req, res) {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Validate the password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                user_category: user.user_category,
                full_name: user.full_name, // Include full_name for personalization
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Role-based redirection routes
        const roleRoutes = {
            Customer: "/api/homepage", // Shared homepage for Customers
            Business: "/api/homepage", // Shared homepage for Businesses
        };

        res.status(200).json({
            message: `Welcome back, ${user.full_name}!`,
            token,
            user: {
                id: user.id,
                email: user.email,
                user_category: user.user_category,
                full_name: user.full_name,
            },
            redirectTo: roleRoutes[user.user_category] || null, // Redirect based on role
        });
    } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).json({ message: "Server error" });
    }
}

