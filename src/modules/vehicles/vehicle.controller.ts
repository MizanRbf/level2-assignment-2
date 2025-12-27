import { Request, Response } from "express";
import { vehicleServices } from "./vehicle.service";

// Create Vehicle
const createVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.createVehicles(req.body);
    res.status(200).json({
      success: true,
      message: "Vehicle inserted successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get Vehicles
const getVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getVehicles();
    res.status(200).json({
      success: true,
      message: "Vehicles Found",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get Single Vehicles
const getSingleVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getSingleVehicles(
      req.params.vehicleId
    );
    res.status(200).json({
      success: true,
      message: "Vehicle Found",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Update Vehicle
const updateVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.updateVehicle(
      Number(req.params.vehicleId),
      req.body
    );
    res.status(200).json({
      success: true,
      message: "Updated Successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete Vehicle
const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.deleteVehicle();
    res.status(200).json({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// Export
export const vehicleControllers = {
  createVehicle,
  getVehicle,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};
