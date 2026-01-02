import { Request, Response } from "express";
import { userServices } from "./user.service";

// Get User
const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUser();

    // delete password
    // const users = result.rows.map(({ password, ...rest }) => rest);

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
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
    // userId
    const userIdToUpdate = Number(req.params.userId);
    // LoggedIn user
    const loggedInUser = req.user; //from auth middleware

    //  customer cannot update another user
    if (loggedInUser.role !== "admin" && loggedInUser.id !== userIdToUpdate) {
      return res.status(403).json({
        success: false,
        message: "You can update only your own profile",
      });
    }
    // cannot update role
    if (loggedInUser.role !== "admin" && "role" in req.body) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update role",
      });
    }
    // update
    const result = await userServices.updateUser(userIdToUpdate, req.body);
    const { password, ...rest } = result.rows[0];
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: rest,
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
    const result = await userServices.deleteUser(Number(req.params.userId));
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const userControllers = {
  getUser,
  updateUser,
  deleteUser,
};
