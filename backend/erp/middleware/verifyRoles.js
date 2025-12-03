// erp/middleware/verifyRoles.js
export default function verifyRoles(...allowedRoles) {
  return (req, res, next) => {
    const role = req.erpUser?.role;
    if (!role || !allowedRoles.includes(role)) {
      return res.status(403).json({ message: "Not authorized" });
    }
    next();
  };
}
