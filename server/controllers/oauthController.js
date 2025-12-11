// server/controllers/oauthController.js
import jwt from "jsonwebtoken";

export const handleGoogleCallback = (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.redirect(process.env.CLIENT_URL + "/?authError=1");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });

    // redirect to your dashboard app route with token in query
    const redirectUrl = `${process.env.CLIENT_URL}/app?token=${token}`;
    return res.redirect(redirectUrl);
  } catch (err) {
    console.error("OAuth callback error:", err);
    return res.redirect(process.env.CLIENT_URL + "/?authError=1");
  }
};
