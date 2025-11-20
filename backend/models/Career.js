import mongoose from "mongoose";

const CareerSchema = new mongoose.Schema(
  {
    userId: String,
    name: String,
    email: String,
    message: String,
    resumeUrl: String,
    resumeName: String,
  },
  { timestamps: true }
);

export default mongoose.model("Career", CareerSchema);
