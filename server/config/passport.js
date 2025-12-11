import dotenv from "dotenv";
dotenv.config();

console.log("🔍 GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
console.log("🔍 GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET);
console.log("🔍 GOOGLE_CALLBACK_URL:", process.env.GOOGLE_CALLBACK_URL);

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // profile contains id, displayName, emails...
        const googleId = profile.id;
        const email = profile.emails?.[0]?.value?.toLowerCase();

        // 1) Try find user by googleId
        let user = await User.findOne({ googleId });

        // 2) If not found by googleId, try by email (link existing account)
        if (!user && email) {
          user = await User.findOne({ email });
          if (user) {
            user.googleId = googleId;
            await user.save();
          }
        }

        // 3) If still not found, create user (no local password)
        if (!user) {
          user = await User.create({
            fullName: profile.displayName || (email || "").split("@")[0],
            email: email || `no-email-${googleId}@example.com`,
            password: null,
            googleId
          });
        }

        return done(null, user);
      } catch (err) {
        console.error("Google strategy error:", err);
        return done(err, null);
      }
    }
  )
);
