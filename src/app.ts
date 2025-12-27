import express from "express";
import { Request, Response } from "express";
import initDB from "./config/db";
import { userRoutes } from "./modules/users/user.routes";
import { vehicleRoutes } from "./modules/vehicles/vehicle.routes";
import { bookingRoutes } from "./modules/bookings/booking.routes";
import { authRoutes } from "./modules/auth/auth.routes";

const app = express();

// parser
app.use(express.json());

// DB
initDB();

// APIs
// users CRUD
app.use("/api/v1/users", userRoutes);

// vehicles CRUD
app.use("/api/v1/vehicles", vehicleRoutes);

// bookings CRUD
app.use("/api/v1/bookings", bookingRoutes);

// auth routes
app.use("/api/v1/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
