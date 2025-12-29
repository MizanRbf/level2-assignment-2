import { Request, Response } from "express";
import { vehicleServices } from "./vehicle.service";

// Create Vehicle
const createVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.createVehicles(req.body);
    res.status(200).json({
      success: true,
      message: "Vehicle created successfully",
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
    if (result.rows.length === 0) {
      res.status(200).json({
        success: true,
        message: "No vehicles found",
        data: result.rows,
      });
    }
    res.status(200).json({
      success: true,
      message: "Vehicles retrieved successfully",
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
      message: "Vehicle retrieved successfully",
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
      message: "Vehicle updated successfully",
      data: {
        id: result.rows[0].id,
        vehicle_name: result.rows[0].vehicle_name,
        type: result.rows[0].type,
        registration_number: result.rows[0].registration_number,
        daily_rent_price: Number(result.rows[0].daily_rent_price),
        availability_status: result.rows[0].availability_status,
      },
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
    const result = await vehicleServices.deleteVehicle(
      Number(req.params.vehicleId)
    );
    res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
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
