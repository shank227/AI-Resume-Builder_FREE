import express from "express";
import passport from "passport";
import { register, login, getMe } from "../controllers/authController.js";
import { handleGoogleCallback } from "../controllers/oauthController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Local auth
router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);

// Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: process.env.CLIENT_URL + "/auth/failure" }),
  handleGoogleCallback
);

export default router;
