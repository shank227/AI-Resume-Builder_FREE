import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    res.json({ message: "Protected route working!", user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
