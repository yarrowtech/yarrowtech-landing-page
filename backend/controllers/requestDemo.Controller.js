// import RequestDemo from "../models/RequestDemo.js";

// export const submitRequestDemo = async (req, res) => {
//   try {
//     const data = await RequestDemo.create({
//       ...req.body,
//       userId: req.user.userId,
//     });

//     res.json({ message: "Demo request submitted", data });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// controllers/requestDemo.Controller.js
import RequestDemo from "../models/RequestDemo.js";

export const submitRequestDemo = async (req, res) => {
  try {
    const data = await RequestDemo.create({
      ...req.body,
      userId: req.user?.id || req.user?.userId || null, // safe if route is public
    });

    return res.status(201).json({ message: "Demo request submitted", data });
  } catch (err) {
    console.error("Request Demo Error:", err);
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
};
