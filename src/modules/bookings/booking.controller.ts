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

  // Decode token
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
    const result = await bookingServices.updateBooking(
      Number(req.params.bookingId),
      req.body
    );
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

// Export
export const bookingControllers = {
  createBooking,
  getBookings,
  updateBooking,
};
