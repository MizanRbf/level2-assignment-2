import express from "express";
import { authController } from "./auth.controller";

const router = express.Router();

// sing up
router.post("/signup", authController.createUser);

// sign in
router.post("/signin", authController.loginUser);

export const authRoutes = router;
