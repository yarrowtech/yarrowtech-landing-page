import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/techSidebar.css";

export default function TechSidebar() {
  return (
    <aside className="tech-sidebar">
      <h2 className="sidebar-title">Tech Panel</h2>

      <nav className="sidebar-menu">
        <NavLink
          to="/techlead/dashboard"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/techlead/project-updates"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          Project Updates
        </NavLink>

        <NavLink
          to="/techlead/team-overview"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          Team Overview
        </NavLink>

        <NavLink
          to="/techlead/profile"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          Profile
        </NavLink>
      </nav>
    </aside>
  );
}
