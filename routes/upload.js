import express from "express";
import { carousel, getAllCarousel } from "../controllers/uploadImages.js";

const router = express();

// login User
router.post("/carousel", carousel);
router.get("/carousel", getAllCarousel);

export default router;
