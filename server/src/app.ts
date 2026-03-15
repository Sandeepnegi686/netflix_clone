import express, { Express, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
require("dotenv").config();

import "./config/passport";
import dbConnect from "./lib/dbConnect";
import authRouter from "./Routes/authRoute";
import moviesRouter from "./Routes/moviesRoutes";

const app: Express = express();
const DB = process.env.DB_URL || "";
const PORT = process.env.PORT || 80;

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://netflix-clone-chi-six-61.vercel.app",
    ],
    credentials: true,
  }),
);
app.use(cookieParser());

app.get("/", (_: Request, res: Response) => res.send("hello from Ts - node"));

app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/movies/", moviesRouter);

async function startServer() {
  try {
    await dbConnect(DB)
      .then(() => console.log("Database Connected."))
      .catch((e) => {
        console.log(e);
      });
    app.listen(PORT, () => {
      console.log("Server started at port :", PORT);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

startServer();
