import express from "express";
import { vehicleControllers } from "./vehicle.controller";
import auth from "../../middleware/auth";
const router = express.Router();

// Post vehicles
router.post("/", auth("admin"), vehicleControllers.createVehicle);

// Get all vehicles
router.get("/", vehicleControllers.getVehicle);

// Get Vehicle by ID
router.get("/:vehicleId", vehicleControllers.getSingleVehicle);

// Update vehicle
router.put("/:vehicleId", auth("admin"), vehicleControllers.updateVehicle);

// Delete vehicle
router.delete("/:vehicleId", auth("admin"), vehicleControllers.deleteVehicle);

export const vehicleRoutes = router;
