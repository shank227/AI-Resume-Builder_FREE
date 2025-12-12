import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createResume,
  getUserResumes,
  getResume,
  getAllResumes,
  updateResume,
  deleteResume
} from "../controllers/resumeController.js";

const router = express.Router();

router.post("/", protect, createResume);
router.get("/", protect, getUserResumes);
router.get("/:id", protect, getResume);
router.get("/", protect, getAllResumes);
router.put("/:id", protect, updateResume);
router.delete("/:id", protect, deleteResume);

export default router;
