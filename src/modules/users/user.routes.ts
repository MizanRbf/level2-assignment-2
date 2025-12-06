import express from "express";
import { userControllers } from "./user.controller";

const router = express.Router();

router.post("/", userControllers.createUser);

router.get("/", userControllers.getUser);

// router.put("/");
router.put("/", userControllers.updateUser);

// router.delete("/");
router.delete("/", userControllers.deleteUser);

export const userRoutes = router;
