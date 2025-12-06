import express from "express";
import { bookingControllers } from "./booking.controller";

const router = express.Router();

// Post Router
router.post("/", bookingControllers.createBooking);

// Export
export const bookingRoutes = router;
