import express from "express";
import { SignIn } from "../controllers/authController.js";

const router = express();

// login User
router.post("/signIn", SignIn);

export default router;
