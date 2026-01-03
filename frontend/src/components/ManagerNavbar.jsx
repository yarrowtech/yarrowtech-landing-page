import React, { useState } from "react";
import "../styles/ManagerNavbar.css";
import { Bell, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ManagerNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  /* ================= LOGOUT ================= */
  const handleLogout = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // ✅ Clear ERP auth data
    localStorage.removeItem("erp_token");
    localStorage.removeItem("erp_role");

    navigate("/manager/login");
  };

  /* ================= TOGGLE MENU ================= */
  const toggleMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className="manager-navbar">
      <h3 className="nav-title">Welcome, Manager</h3>

      <div className="nav-actions">
        <div className="icon-box">
          <Bell className="nav-icon" />
        </div>

        {/* AVATAR BUTTON */}
        <button
          type="button"
          className="avatar-wrapper"
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onClick={toggleMenu}
        >
          <img
            src="https://avatar.iran.liara.run/public"
            alt="manager"
            className="manager-avatar"
          />
        </button>

        {/* DROPDOWN */}
        {menuOpen && (
          <div
            className="nav-dropdown"
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <div className="dropdown-item">
              <User size={18} />
              <span>Profile</span>
            </div>

            <div
              className="dropdown-item logout"
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onClick={handleLogout}
            >
              <LogOut size={18} />
              <span>Logout</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
