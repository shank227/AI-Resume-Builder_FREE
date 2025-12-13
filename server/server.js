import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import resumeRoutes from "./routes/resume.js";
import passport from "passport";
import "./config/passport.js";
import aiRoutes from "./routes/ai.js";

const app = express();
connectDB();

const allowedOrigins = [
  "https://cvaichemyio.netlify.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow non-browser tools like Postman
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// 🔴 THIS LINE IS CRITICAL
app.options("*", cors());


app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Routes
app.use("/api/ai", aiRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

app.get("/", (req, res) => res.send("AI Resume Builder API"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
