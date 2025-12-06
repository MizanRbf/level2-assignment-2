import express from "express";
import { vehicleControllers } from "./vehicle.controller";
const router = express.Router();

router.post("/", vehicleControllers.createVehicles);

router.get("/", vehicleControllers.getVehicles);

export const vehicleRoutes = router;
