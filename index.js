import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectFirebase } from "./connectFirebase.js";

//ROUTES
import auth from "./routes/auth.js";
import carousel from "./routes/carousel.js";
import teams from "./routes/teams.js";
import HttpSuccessCode from "./utils/HttpSuccssCodes.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 4000;

app.use(cookieParser());
app.use(express.json());
app.use(cors({ credentials: true }));

app.use("/api/auth", auth);
app.use("/api/carousel", carousel);
app.use("/api/teams", teams);

app.get("/docker", async (request, response, next) => {
  response
    .status(HttpSuccessCode.OK)
    .json({ message: `Docker is now working` });
});

app.use((err, request, response, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return response.status(status).json({
    success: false,
    status: status,
    message: message,
  });
});

app.listen(PORT, () => {
  console.log(`port is listening on ${PORT}`);
  console.log("express connected");
});
