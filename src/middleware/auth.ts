// higher order function return kore function

import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = () => {
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
      const decoded = jwt.verify(token, config.jwtSecret as string);

      req.user = decoded as JwtPayload;

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
