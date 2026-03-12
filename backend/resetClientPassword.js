import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import ERPClient from "./erp/models/Client.js";
import dotenv from "dotenv";

dotenv.config();

async function resetPassword() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    const email = "democlient6@gmail.com";
    const newPassword = "12345";

    const hash = await bcrypt.hash(newPassword, 10);

    const result = await ERPClient.updateOne(
      { email },
      { password: hash }
    );

    console.log("✅ Password reset result:", result);
    console.log("✅ New login password:", newPassword);

    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

resetPassword();
