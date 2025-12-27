import { Request, Response } from "express";
import { bookingServices } from "./booking.service";

// Create Bookings
const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.createBooking(req.body);

    res.status(200).json({
      success: true,
      message: "Bookings posted successfully",
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
  try {
    const result = await bookingServices.getBookings();

    res.status(200).json({
      success: true,
      message: "Bookings data found successfully",
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
    const result = await bookingServices.updateBooking();
    res.status(200).json({
      success: true,
      message: "Updated Successfully",
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
