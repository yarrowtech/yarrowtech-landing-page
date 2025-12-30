// import express from "express";
// import { getAdminStats, getERPUsers } from "../controllers/admin.controller.js";
// import { verifyErpToken } from "../middleware/erpAuth.js";
// import verifyRoles from "../middleware/verifyRoles.js";

// const router = express.Router();

// // Apply authentication & role check on all admin routes
// router.use(verifyErpToken, verifyRoles("admin"));

// // ⭐ Admin Stats
// router.get("/stats", getAdminStats);

// // ⭐ Admin — Get ERP Users
// router.get("/users", getERPUsers);

// export default router;




import express from "express";
import {
  getAdminStats,
  getERPUsers,
  createERPUser,
  toggleUserStatus,
  resetUserPassword,
} from "../controllers/admin.controller.js";

import { verifyErpToken } from "../middleware/erpAuth.js";
import verifyRoles from "../middleware/verifyRoles.js";

const router = express.Router();

/* ============================================================
   🔐 ADMIN AUTH + ROLE GUARD
============================================================ */
router.use(verifyErpToken, verifyRoles("admin"));

/* ============================================================
   📊 ADMIN DASHBOARD
============================================================ */
router.get("/stats", getAdminStats);

/* ============================================================
   👥 USER MANAGEMENT (ADMIN)
============================================================ */

// Get all ERP users
router.get("/users", getERPUsers);

// Create new ERP user (manager / techlead / admin)
router.post("/create-user", createERPUser);

// Toggle user status (active / inactive)
router.put("/user/:id/toggle-status", toggleUserStatus);

// Reset user password
router.put("/user/:id/reset-password", resetUserPassword);

export default router;
