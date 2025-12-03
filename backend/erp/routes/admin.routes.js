import express from "express";
import { getAdminStats, getERPUsers } from "../controllers/admin.controller.js";
import { verifyErpToken } from "../middleware/erpAuth.js";
import verifyRoles from "../middleware/verifyRoles.js";

const router = express.Router();

// Apply authentication & role check on all admin routes
router.use(verifyErpToken, verifyRoles("admin"));

// ⭐ Admin Stats
router.get("/stats", getAdminStats);

// ⭐ Admin — Get ERP Users
router.get("/users", getERPUsers);

export default router;
