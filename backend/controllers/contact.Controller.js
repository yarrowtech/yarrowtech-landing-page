import nodemailer from "nodemailer";
import { Contact } from "../models/contact.js";

const assertEnv = (k) => {
  if (!process.env[k]) throw new Error(`Missing env ${k}`);
};

export const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ error: "All fields are required." });

    // Save first
    const newMessage = await Contact.create({ name, email, message });

    // Check env early
    assertEnv("EMAIL_USER");
    assertEnv("EMAIL_PASS");

    // More robust SMTP settings
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: `"YarrowTech Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `📩 New message from ${name}`,
      html: `<h3>New Contact Form Submission</h3>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong></p><p>${message}</p>`,
    });

    await transporter.sendMail({
      from: `"YarrowTech" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank you for contacting YarrowTech!",
      html: `<div style="font-family:Arial;background:#0b2b2f;padding:20px;color:white;">
               <h2 style="color:#ff9a1f;">Thank you, ${name}!</h2>
               <p>We’ve received your message and our team will get back to you soon.</p>
               <p><strong>Your message:</strong><br/>"${message}"</p>
               <p>— The YarrowTech Team</p>
             </div>`,
    });

    return res.status(201).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("❌ Error submitting contact form:", error);
    // In dev, surface a hint:
    if (process.env.NODE_ENV !== "production") {
      return res.status(500).json({ error: error.message || "Internal error" });
    }
    return res.status(500).json({ error: "Something went wrong, please try again later." });
  }
};