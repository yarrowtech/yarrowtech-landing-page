import React from "react";
import { Navigate } from "react-router-dom";

export default function ERPProtectedRoute({ role, children }) {
  const token = localStorage.getItem("erp_token");
  const savedRole = localStorage.getItem("erp_role");

  // No ERP login → block access
  if (!token || !savedRole) {
    return <Navigate to="/" replace />;
  }

  // Role mismatch → block access
  if (role && savedRole !== role) {
    return <Navigate to="/" replace />;
  }

  // All good → show page
  return children;
}
