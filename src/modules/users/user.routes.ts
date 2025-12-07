import express from "express";
import { userControllers } from "./user.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.post("/", userControllers.createUser);

router.get("/", auth(), userControllers.getUser);

// router.put("/");
router.put("/:id", userControllers.updateUser);

// router.delete("/");
router.delete("/:id", userControllers.deleteUser);

export const userRoutes = router;
