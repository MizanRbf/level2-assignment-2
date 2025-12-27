import express from "express";
import { bookingControllers } from "./booking.controller";
import { userControllers } from "../users/user.controller";

const router = express.Router();

// Post Router
router.post("/", bookingControllers.createBooking);

// Get Router
router.get("/", bookingControllers.getBookings);

// Update Booking
router.put("/:id", bookingControllers.updateBooking);

// Export
export const bookingRoutes = router;
