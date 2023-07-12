import express from "express";
import { SignIn } from "../controllers/events-controller.js";

const router = express();

// create User
router.post("/signIn", SignIn);

export default router;
