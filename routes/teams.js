import express from "express";
import { addTeams } from "../controllers/teamsController.js";

const router = express();

// carousel
router.post("/", addTeams);

export default router;
