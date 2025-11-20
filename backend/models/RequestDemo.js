import mongoose from "mongoose";

const RequestDemoSchema = new mongoose.Schema(
  {
    userId: String,
    name: String,
    email: String,
    company: String,
    message: String,
  },
  { timestamps: true }
);

export default mongoose.model("RequestDemo", RequestDemoSchema);
