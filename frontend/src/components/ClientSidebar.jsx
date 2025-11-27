import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Box,
  CreditCard,
  Clock3,
  User,
} from "lucide-react";
import "../styles/ClientSidebar.css";

export default function ClientSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const menu = [
    { label: "Dashboard", icon: <Home size={20} />, to: "/client/dashboard" },
    { label: "My Projects", icon: <Box size={20} />, to: "/client/projects" },
    { label: "Payments", icon: <CreditCard size={20} />, to: "/client/payments" },
    { label: "History", icon: <Clock3 size={20} />, to: "/client/history" },
    { label: "Profile", icon: <User size={20} />, to: "/client/profile" },
  ];

  return (
    <aside className={`client-sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Header */}
      <div className="client-sidebar-top">
        <h2 className="client-sidebar-logo">
          {!collapsed && "Client Panel"}
        </h2>
      </div>

      {/* Menu */}
      <nav className="client-sidebar-nav">
        {menu.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              `client-sidebar-link ${isActive ? "active" : ""}`
            }
          >
            {item.icon}
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
