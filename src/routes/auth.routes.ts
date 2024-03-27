import express from "express";
import { authController } from "../controllers/AuthController";

//----------------------------------------------------------------

const router = express.Router();

// Authentication routes

// Register
router.post("/register", authController.register);

// Login
router.post("/login", authController.login);

export default router;