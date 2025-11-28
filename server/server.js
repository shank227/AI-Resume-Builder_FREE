import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// Test route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Start server
app.listen(5000, () => console.log("Backend running on port 5000"));
