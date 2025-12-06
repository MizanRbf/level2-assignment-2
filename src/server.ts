import express from "express";
import { Request, Response } from "express";
import initDB from "./config/db";
import config from "./config";
import { userRoutes } from "./modules/users/user.routes";

const app = express();
const port = config.port;

// parser
app.use(express.json());

// DB
initDB();

app.use("/users", userRoutes);
// app.use("/bookings");
// app.use("/vehicle");

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
