import express from "express";
import { vehicleControllers } from "./vehicle.controller";
const router = express.Router();

router.post("/", vehicleControllers.createVehicle);

router.get("/", vehicleControllers.getVehicle);

router.put("/", vehicleControllers.updateVehicle);

router.delete("/", vehicleControllers.deleteVehicle);

export const vehicleRoutes = router;
