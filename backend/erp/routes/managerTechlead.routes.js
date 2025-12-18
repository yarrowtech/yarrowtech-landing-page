// erp/routes/managerTechlead.routes.js
import express from "express";

const router = express.Router();

/* -----------------------------------------
   Parse TECHLEADS from .env
----------------------------------------- */
function parseList(str) {
  if (!str) return [];
  return str.split(",").map((pair, index) => {
    const [email, password] = pair.trim().split(":");
    return {
      email,
      password,
      name: `Tech Lead ${index + 1}`, // Temporary display names
    };
  });
}

const techLeads = parseList(process.env.TECHLEADS);

/* -----------------------------------------
   GET /api/erp/manager/techleads
----------------------------------------- */
router.get("/", (req, res) => {
  return res.json({
    success: true,
    techLeads: techLeads.map((t) => ({
      email: t.email,
      name: t.name,
    })),
  });
});

export default router;
