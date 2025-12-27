import express from "express";
import { vehicleControllers } from "./vehicle.controller";
import auth from "../../middleware/auth";
const router = express.Router();

// Post vehicles
router.post("/", vehicleControllers.createVehicle);

// Get all vehicles
router.get("/", vehicleControllers.getVehicle);

// Get single vehicles
router.get("/:vehicleId", vehicleControllers.getSingleVehicle);

// Update vehicles
router.put("/:vehicleId", auth("admin"), vehicleControllers.updateVehicle);

// Delete vehicles
router.delete("/:vehicleId", auth("admin"), vehicleControllers.deleteVehicle);

export const vehicleRoutes = router;
