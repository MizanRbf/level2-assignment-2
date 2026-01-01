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
  const token: any = req.headers.authorization;

  // Decoded token
  const decoded = jwt.verify(token, config.jwtSecret as string) as JwtPayload;

  const { role, id } = decoded;
  try {
    const result = await bookingServices.getBookings(role, id);

    res.status(200).json({
      success: true,
      message:
        role === "admin"
          ? "Bookings retrieved successfully"
          : "Your bookings retrieved successfully",
      data: result.rows,
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
    const bookingId = req.params.bookingId;

    // Token
    const token: any = req.headers.authorization;

    // Decoded token
    const decoded = jwt.verify(token, config.jwtSecret as string) as JwtPayload;

    const { role } = decoded;

    const result = await bookingServices.updateBooking(
      Number(bookingId),
      req.body,
      role
    );
    res.status(200).json({
      success: true,
      message:
        req.body.status === "cancelled"
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
