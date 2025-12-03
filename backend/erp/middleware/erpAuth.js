// erp/middleware/erpAuth.js
import jwt from "jsonwebtoken";

export function signErpToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
}

export function verifyErpToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "ERP login required" });

  try {
    req.erpUser = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: "Invalid ERP token" });
  }
}
