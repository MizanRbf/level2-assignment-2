import express from "express";
import { userControllers } from "./user.controller";
import auth from "../../middleware/auth";

const router = express.Router();

// Get All Users
router.get("/", auth("admin"), userControllers.getUser);

// Update user
router.put("/:userId", auth("admin", "customer"), userControllers.updateUser);

// Delete user
router.delete("/:userId", auth("admin"), userControllers.deleteUser);

export const userRoutes = router;
