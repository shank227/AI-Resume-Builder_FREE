import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, default: "My Resume" },
    data: { type: Object, default: {} },
  },
  { timestamps: true }
);

export default mongoose.model("Resume", resumeSchema);
