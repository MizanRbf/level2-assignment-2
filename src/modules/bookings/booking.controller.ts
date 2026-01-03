import { Request, Response } from "express";
import { bookingServices } from "./booking.service";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";

// Create Bookings
const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.createBooking(req.body);

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// Get Bookings
const getBookings = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  // Check Token
  if (!authHeader) {
    return res.status(500).json({
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

  // Decoded token
  const decoded = jwt.verify(token, config.jwtSecret as string) as JwtPayload;

  const { role, id } = decoded;
  try {
    const bookings = await bookingServices.getBookings(role, id);

    res.status(200).json({
      success: true,
      message:
        role === "admin"
          ? "Bookings retrieved successfully"
          : "Your bookings retrieved successfully",
      data: bookings,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// Update Booking
const updateBooking = async (req: Request, res: Response) => {
  try {
    // Booking Id
    const bookingId = Number(req.params.bookingId);

    // Status
    const { status } = req.body;

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

    // Decoded token
    if (!token) {
      return res.status(401).json({ success: false, message: "Token missing" });
    }
    const decoded = jwt.verify(token, config.jwtSecret as string) as JwtPayload;

    const { role } = decoded;

    const result = await bookingServices.updateBooking(bookingId, status, role);
    res.status(200).json({
      success: true,
      message:
        status === "cancelled"
          ? "Booking cancelled successfully"
          : "Booking marked as returned. Vehicle is now available",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// Export
export const bookingControllers = {
  createBooking,
  getBookings,
  updateBooking,
};
