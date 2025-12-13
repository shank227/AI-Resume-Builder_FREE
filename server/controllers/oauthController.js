// server/controllers/oauthController.js
import jwt from "jsonwebtoken";

export const handleGoogleCallback = (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.redirect(
        `${process.env.CLIENT_URL}/login?authError=1`
      );
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    // ✅ Redirect to GoogleAuthHandler
    return res.redirect(
      `${process.env.CLIENT_URL}/google-auth?token=${token}`
    );

  } catch (err) {
    console.error("OAuth callback error:", err);
    return res.redirect(
      `${process.env.CLIENT_URL}/login?authError=1`
    );
  }
};
