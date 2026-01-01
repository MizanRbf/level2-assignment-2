import { Request, Response } from "express";
import { authService } from "./auth.service";

// create user
const createUser = async (req: Request, res: Response) => {
  const user = req.body;
  try {
    const result = await authService.createUser(user);
    const userInfo = result.rows[0];
    const { password, ...userWithoutPassword } = userInfo;
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: userWithoutPassword,
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
  console.log(req.body);
  try {
    const result = await authService.loginUser(email, password);

    res.status(200).json({
      success: true,
      message: "Login successful",
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
