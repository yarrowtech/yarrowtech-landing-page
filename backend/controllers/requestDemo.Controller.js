

// import RequestDemo from "../models/RequestDemo.js";

// /* ============================================================
//    SUBMIT REQUEST DEMO (Normal public user)
// ============================================================ */
// export const submitRequestDemo = async (req, res) => {
//   try {
//     const { name, email, companyName, message } = req.body;

//     if (!name || !email) {
//       return res.status(400).json({ error: "Name and Email required." });
//     }

//     const newReq = await RequestDemo.create({
//       name,
//       email,
//       companyName,
//       message,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Demo request submitted successfully!",
//       data: newReq,
//     });
//   } catch (err) {
//     console.error("❌ DEMO REQUEST ERROR:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// /* ============================================================
//    GET ALL DEMO REQUESTS (Admin only)
// ============================================================ */
// export const getAllDemoRequests = async (req, res) => {
//   try {
//     const requests = await RequestDemo.find().sort({ createdAt: -1 });

//     res.json({
//       success: true,
//       count: requests.length,
//       requests,
//     });
//   } catch (err) {
//     console.error("❌ FETCH DEMO REQUESTS ERROR:", err);
//     res.status(500).json({ error: "Failed to fetch demo requests" });
//   }
// };






import RequestDemo from "../models/RequestDemo.js";

/* ============================================================
   🌐 SUBMIT REQUEST DEMO (Website User)
============================================================ */
export const submitRequestDemo = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      companyName,
      location,
      serviceInterested,
      preferredContactMethod,
      projectDescription,
    } = req.body;

    // Required validation
    if (!fullName || !email || !serviceInterested || !projectDescription) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const demoRequest = await RequestDemo.create({
      fullName,
      email,
      phoneNumber,
      companyName,
      location,
      serviceInterested,
      preferredContactMethod,
      projectDescription,
      createdByUser: req.user?.id || null,
    });

    res.status(201).json({
      success: true,
      message: "Demo request submitted successfully",
      data: demoRequest,
    });
  } catch (error) {
    console.error("❌ REQUEST DEMO ERROR:", error);
    res.status(500).json({
      message: "Server error while submitting demo request",
    });
  }
};

/* ============================================================
   👑 ADMIN → VIEW ALL DEMO REQUESTS (READ ONLY)
============================================================ */
export const getAllDemoRequests = async (req, res) => {
  try {
    const requests = await RequestDemo.find()
      .populate("assignedManager", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: requests.length,
      requests,
    });
  } catch (error) {
    console.error("❌ FETCH DEMO REQUESTS ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch demo requests",
    });
  }
};

/* ============================================================
   🧑‍💼 MANAGER → VIEW DEMO REQUESTS
============================================================ */
export const getManagerDemoRequests = async (req, res) => {
  try {
    const requests = await RequestDemo.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      requests,
    });
  } catch (error) {
    console.error("❌ MANAGER FETCH DEMO ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch demo requests",
    });
  }
};

/* ============================================================
   🧑‍💼 MANAGER → UPDATE LEAD STATUS ONLY
============================================================ */
export const updateLeadStatusByManager = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "new",
      "contacted",
      "in-progress",
      "closed",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid lead status",
      });
    }

    const updatedLead = await RequestDemo.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedLead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    res.json({
      success: true,
      message: "Lead status updated successfully",
      lead: updatedLead,
    });
  } catch (error) {
    console.error("❌ UPDATE LEAD STATUS ERROR:", error);
    res.status(500).json({
      message: "Failed to update lead status",
    });
  }
};
