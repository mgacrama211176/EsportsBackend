// import mongoose from "mongoose";
import bcrypt from "bcrypt";

export const eventsController = async (request, response, next) => {
  try {
    const message = "dafuq";
    response.status(200).json(message);
  } catch (err) {
    next(err);
  }
};
