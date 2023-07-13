import express from "express";
import {
  addTeams,
  getAllTeams,
  deleteTeam,
} from "../controllers/teamsController.js";

const router = express();

// carousel
router.post("/", addTeams);
router.get("/", getAllTeams);
router.delete("/:teamName", deleteTeam);

export default router;
