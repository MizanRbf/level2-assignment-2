import express from "express";
import { bookingControllers } from "./booking.controller";

const router = express.Router();

// Post Router
router.post("/", bookingControllers.createBooking);

// Get Router
router.get("/", bookingControllers.getBookings);

// Export
export const bookingRoutes = router;
