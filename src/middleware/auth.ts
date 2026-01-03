// higher order function return kore function

import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../config/db";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
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
        return res
          .status(401)
          .json({ success: false, message: "Token missing" });
      }
      const decoded = jwt.verify(
        token,
        config.jwtSecret as string
      ) as JwtPayload;

      req.user = decoded;

      // Check user from db
      const user = await pool.query(
        `SELECT id, role FROM users WHERE email = $1`,
        [decoded.email]
      );

      if (user.rows.length === 0) {
        throw new Error("User not found");
      }

      // Role-based access
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(500).json({
          error: "unauthorized!!!",
        });
      }

      next();
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };
};
export default auth;
