// api/signUpRoutes.mjs

import express from "express";
import { signUp } from "../controllers/userController.mjs";

const router = express.Router();

// Route to handle user signup
router.post("/api/signup", signUp);

export default router;
