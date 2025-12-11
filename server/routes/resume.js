import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();
router.use(protect);

// GET /api/resume  -> returns the user's resume (or null)
router.get("/", async (req, res) => {
  try {
    const user = req.user;
    return res.json({ resume: user.resume || null });
  } catch (err) {
    console.error("Get resume error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/resume -> create or update the single resume
router.put("/", async (req, res) => {
  try {
    const { title, data } = req.body;
    const user = req.user;

    // Set resume (replace existing)
    user.resume = {
      title: title || (user.resume?.title || "My Resume"),
      data: data || {}
    };

    await user.save();
    return res.json({ resume: user.resume });
  } catch (err) {
    console.error("Update resume error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/resume -> clear resume (optional)
router.delete("/", async (req, res) => {
  try {
    const user = req.user;
    user.resume = {};
    await user.save();
    return res.json({ message: "Resume cleared" });
  } catch (err) {
    console.error("Delete resume error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
