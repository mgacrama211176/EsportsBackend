import express from "express";
import {
  postCarousel,
  getAllCarousel,
  deleteImageFromCarousel,
} from "../controllers/uploadImages.js";

const router = express();

// carousel
router.post("/", postCarousel);
router.get("/", getAllCarousel);
router.delete("/", deleteImageFromCarousel);

export default router;
