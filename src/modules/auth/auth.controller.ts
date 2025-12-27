import { Request, Response } from "express";
import { authService } from "./auth.service";

// create user
const createUser = async (req: Request, res: Response) => {
  const user = req.body;
  try {
    const result = await authService.createUser(user);
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

// login user
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await authService.loginUser(email, password);
    console.log(result);
    res.status(200).json({
      success: true,
      message: "login successful",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const authController = {
  createUser,
  loginUser,
};
