import RequestDemo from "../models/RequestDemo.js";

export const submitRequestDemo = async (req, res) => {
  try {
    const data = await RequestDemo.create({
      ...req.body,
      userId: req.user.userId,
    });

    res.json({ message: "Demo request submitted", data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
