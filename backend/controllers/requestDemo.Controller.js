

import RequestDemo from "../models/RequestDemo.js";

/* ============================================================
   SUBMIT REQUEST DEMO (Normal public user)
============================================================ */
export const submitRequestDemo = async (req, res) => {
  try {
    const { name, email, companyName, message } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and Email required." });
    }

    const newReq = await RequestDemo.create({
      name,
      email,
      companyName,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Demo request submitted successfully!",
      data: newReq,
    });
  } catch (err) {
    console.error("❌ DEMO REQUEST ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
};

/* ============================================================
   GET ALL DEMO REQUESTS (Admin only)
============================================================ */
export const getAllDemoRequests = async (req, res) => {
  try {
    const requests = await RequestDemo.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: requests.length,
      requests,
    });
  } catch (err) {
    console.error("❌ FETCH DEMO REQUESTS ERROR:", err);
    res.status(500).json({ error: "Failed to fetch demo requests" });
  }
};
