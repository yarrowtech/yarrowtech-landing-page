import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { OAuth2Client } from "google-auth-library";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// --------------------------------
// REGISTER USER
// --------------------------------
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already registered" });

    const user = await User.create({ name, email, password });

    res.json({
      message: "Registration successful",
      token: generateToken(user),
      user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// --------------------------------
// LOGIN USER
// --------------------------------
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await user.matchPassword(password);
    if (!match) return res.status(400).json({ message: "Incorrect password" });

    res.json({
      message: "Login successful",
      token: generateToken(user),
      user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// --------------------------------
// GOOGLE LOGIN
// --------------------------------
export const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential)
      return res.status(400).json({ message: "No Google credential received" });

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { email, name, picture, sub: googleId } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        googleId,
        avatar: picture,
        password: googleId + process.env.JWT_SECRET,
      });
    }

    res.json({
      message: "Google login successful",
      token: generateToken(user),
      user,
    });
  } catch (err) {
    console.log("GOOGLE LOGIN ERROR:", err);
    res.status(500).json({ message: "Google authentication failed" });
  }
};
