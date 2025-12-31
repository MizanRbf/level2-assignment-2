// higher order function return kore function

import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../config/db";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      // Check Token
      if (!token) {
        return res.status(500).json({
          success: false,
          message: "You are not allowed",
        });
      }

      // If token found then decode it
      const decoded = jwt.verify(
        token,
        config.jwtSecret as string
      ) as JwtPayload;

      req.user = decoded;

      // Check user from db
      const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [
        decoded.email,
      ]);

      if (user.rows.length === 0) {
        throw new Error("User not found");
      }

      // allowed if roles.includes
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
