import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    title: { type: String, default: "Untitled Resume" },

    data: { type: Object, required: true }  // stores ALL resume fields
  },
  { timestamps: true }
);

export default mongoose.model("Resume", resumeSchema);
