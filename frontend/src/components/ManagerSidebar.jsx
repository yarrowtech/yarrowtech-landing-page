import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/ManagerSidebar.css";

import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Bell,
  Settings,
} from "lucide-react";

export default function ManagerSidebar() {
  return (
    <aside className="manager-sidebar">
      <h2 className="manager-logo">Manager Panel</h2>

      <nav className="manager-nav">
        <NavLink to="/manager" className="nav-item">
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink to="/manager/projects" className="nav-item">
          <FolderKanban size={18} />
          Manage Projects
        </NavLink>

        <NavLink to="/manager/create-client" className="nav-item">
          <Users size={18} />
          Create Client
        </NavLink>

        <NavLink to="/manager/notifications" className="nav-item">
          <Bell size={18} />
          Notifications
        </NavLink>

        <NavLink to="/manager/settings" className="nav-item">
          <Settings size={18} />
          Settings
        </NavLink>
      </nav>
    </aside>
  );
}
