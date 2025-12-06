import express from "express";
import { Request, Response } from "express";
import initDB from "./config/db";
import config from "./config";
import { userRoutes } from "./modules/users/user.routes";
import { vehicleRoutes } from "./modules/vehicles/vehicle.routes";
import { bookingRoutes } from "./modules/bookings/booking.routes";

const app = express();
const port = config.port;

// parser
app.use(express.json());

// DB
initDB();

// APIs
app.use("/users", userRoutes);
app.use("/vehicles", vehicleRoutes);
app.use("/bookings", bookingRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
