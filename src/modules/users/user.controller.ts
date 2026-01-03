import { Request, Response } from "express";
import { userServices } from "./user.service";
import config from "../../config";
import jwt, { JwtPayload } from "jsonwebtoken";

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

    // authHeader
    const authHeader = req.headers.authorization;

    // Check Token
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "You are not allowed",
      });
    }

    // Bearer token support
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    // If token found then decode it
    if (!token) {
      return res.status(401).json({ success: false, message: "Token missing" });
    }

    // decode token
    const decoded = jwt.verify(token, config.jwtSecret as string) as JwtPayload;

    // req.user = decoded;

    // LoggedIn user
    const loggedInUserId = decoded.id;
    const loggedInUserRole = decoded.role;

    // update
    const result = await userServices.updateUser(
      userIdToUpdate,
      loggedInUserId,
      loggedInUserRole,
      req.body
    );
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
