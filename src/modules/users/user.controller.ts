import { Request, Response } from "express";
import { userServices } from "./user.service";

// Create User
const createUser = async (req: Request, res: Response) => {
  const user = req.body;
  try {
    const result = await userServices.createUser(user);
    res.status(200).json({
      success: true,
      message: "user added successfully",
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// Get User
const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUser();

    res.status(200).json({
      success: true,
      message: "users found",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// Update User
const updateUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.updateUser();
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

// Delete User
const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.deleteUser();
    res.status(200).json({
      success: true,
      message: "Delete Successfully",
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const userControllers = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
