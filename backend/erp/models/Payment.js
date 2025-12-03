// erp/models/Payment.js
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: "ERPProject" },
  amount: Number,
  status: { type: String, enum: ["paid", "pending"], default: "pending" },
  method: String,
  date: { type: Date, default: Date.now },
  note: String
});

export default mongoose.model("ERPPayment", paymentSchema);
