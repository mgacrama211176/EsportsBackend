import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

//ROUTES
import eventRoute from "./routes/events-route.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000;
const connectDB = () => {
  mongoose
    .connect(
      "PASTE MONGODB LINK HERE",
      { useNewUrlParser: true }
    )
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => {
      throw err;
    });
};

app.use(cookieParser());
app.use(express.json());
app.use(cors({ credentials: true }));

app.use("/api", eventRoute);

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
  connectDB();
  console.log(`port is listening on ${PORT}`);
  console.log("express connected");
});
