import express from "express";
import { eventsController } from "../controllers/events-controller.js";

const router = express();

// create User
router.get("/", eventsController);

export default router;
