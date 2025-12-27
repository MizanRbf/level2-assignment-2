import express from "express";
import { vehicleControllers } from "./vehicle.controller";
import auth from "../../middleware/auth";
const router = express.Router();

router.post("/", vehicleControllers.createVehicle);

router.get("/", vehicleControllers.getVehicle);

router.get("/:vehicleId", vehicleControllers.getVehicle);

router.put("/:vehicleId", auth("admin"), vehicleControllers.updateVehicle);

router.delete("/:vehicleId", auth("admin"), vehicleControllers.deleteVehicle);

export const vehicleRoutes = router;
