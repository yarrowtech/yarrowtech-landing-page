import React, { useState } from "react";
import "../styles/ManagerNavbar.css";
import { Bell, LogOut, User } from "lucide-react";

export default function ManagerNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    // REMOVE token or manager data from localStorage
    localStorage.removeItem("managerToken");

    // Redirect to login page
    window.location.href = "/manager/login";
  };

  return (
    <header className="manager-navbar">
      <h3 className="nav-title">Welcome, Manager</h3>

      <div className="nav-actions">
        <div className="icon-box">
          <Bell className="nav-icon" />
        </div>

        {/* Avatar + dropdown */}
        <div
          className="avatar-wrapper"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <img
            src="https://avatar.iran.liara.run/public"
            alt="manager"
            className="manager-avatar"
          />

          {menuOpen && (
            <div className="nav-dropdown">
              <div className="dropdown-item">
                <User size={18} />
                <span>Profile</span>
              </div>

              <div className="dropdown-item logout" onClick={handleLogout}>
                <LogOut size={18} />
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
