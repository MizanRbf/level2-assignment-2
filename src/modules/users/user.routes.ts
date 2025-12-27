import express from "express";
import { userControllers } from "./user.controller";
import auth from "../../middleware/auth";

const router = express.Router();

// Get user
router.get("/", auth("admin"), userControllers.getUser);

// Update user
router.put("/:id", userControllers.updateUser);

// Delete user
router.delete("/:id", auth("admin"), userControllers.deleteUser);

export const userRoutes = router;
