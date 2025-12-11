import mongoose from "mongoose";

const resumeSubSchema = new mongoose.Schema({
  title: { type: String, default: "My Resume" },
  data: { type: Object, default: {} } // store full resume JSON (templates, fields, etc.)
}, { _id: false });

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, default: "" },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, default: null }, // null for OAuth-only accounts
    googleId: { type: String, default: null },
    resume: { type: resumeSubSchema, default: {} } // single resume per user
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
