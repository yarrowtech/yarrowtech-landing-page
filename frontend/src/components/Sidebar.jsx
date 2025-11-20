import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Users,
  Box,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "../styles/Sidebar.css";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const menu = [
    { label: "Dashboard", icon: <Home size={20} />, to: "/admin" },
    { label: "Users", icon: <Users size={20} />, to: "/admin/users" },
    { label: "Projects", icon: <Box size={20} />, to: "/admin/projects" },
    { label: "Requests", icon: <MessageSquare size={20} />, to: "/admin/request-demo" },
    { label: "Contacts", icon: <MessageSquare size={20} />, to: "/admin/contacts" },
    { label: "Settings", icon: <Settings size={20} />, to: "/admin/settings" },
  ];

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Sidebar Header */}
      <div className="sidebar-top">
        <h2 className="sidebar-logo">{!collapsed && "Yarrowtech Admin"}</h2>
        
      </div>

      {/* Sidebar Menu */}
      <nav className="sidebar-nav">
        {menu.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
          >
            {item.icon}
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
