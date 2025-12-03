// erp/controllers/erpAuth.controller.js
import ERPClient from "../models/Client.js";
import { signErpToken } from "../middleware/erpAuth.js";

// Convert MANAGERS="email:pass,email2:pass2"
function parseList(str) {
  if (!str) return [];
  return str.split(",").map(pair => {
    const [email, password] = pair.split(":");
    return { email, password };
  });
}

const admin = { email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD };
const managers = parseList(process.env.MANAGERS);
const techleads = parseList(process.env.TECHLEADS);

export const erpLogin = async (req, res) => {
  const { email, password } = req.body;

  // ADMIN
  if (email === admin.email && password === admin.password)
    return res.json({ token: signErpToken({ email, role: "admin" }), role: "admin" });

  // MANAGER
  const m = managers.find(x => x.email === email && x.password === password);
  if (m)
    return res.json({ token: signErpToken({ email, role: "manager" }), role: "manager" });

  // TECHLEAD
  const t = techleads.find(x => x.email === email && x.password === password);
  if (t)
    return res.json({ token: signErpToken({ email, role: "techlead" }), role: "techlead" });

  // CLIENT LOGIN (DB)
  const client = await ERPClient.findOne({ email });
  if (!client) return res.status(404).json({ message: "Client not found" });

  const match = await client.matchPassword(password);
  if (!match) return res.status(400).json({ message: "Wrong password" });

  return res.json({
    token: signErpToken({ id: client._id, email, role: "client" }),
    role: "client",
  });
};
