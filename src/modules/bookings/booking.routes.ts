import express from "express";
import { bookingControllers } from "./booking.controller";
import { userControllers } from "../users/user.controller";
import auth from "../../middleware/auth";

const router = express.Router();

// Post Router
router.post("/", bookingControllers.createBooking);

// Get Router
router.get("/", auth("admin", "customer"), bookingControllers.getBookings);

// Update Booking
router.put(
  "/:bookingId",
  auth("admin", "customer"),
  bookingControllers.updateBooking
);

// Export
export const bookingRoutes = router;
