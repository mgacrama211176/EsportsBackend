import express from "express";
import { carousel } from "../controllers/uploadImages.js";

const router = express();

// login User
router.post("/carousel", carousel);

export default router;
