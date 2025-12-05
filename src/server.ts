import express from "express";
import { Request, Response } from "express";
import initDB from "./config/db";
import config from "./config";

const app = express();
const port = config.port;

// DB
initDB();

// parser
app.use(express.json());

app.use("/users");
app.use("/customer");
app.use("/vehicle");

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
