import express from "express";
import {
  carousel,
  getAllCarousel,
  deleteImageFromCarousel,
} from "../controllers/uploadImages.js";

const router = express();

// login User
router.post("/carousel", carousel);
router.get("/carousel", getAllCarousel);
router.delete("/carousel", deleteImageFromCarousel);

export default router;
