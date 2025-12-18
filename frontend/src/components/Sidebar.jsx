// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import {
//   Home,
//   Users,
//   Box,
//   MessageSquare,
//   Settings,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import "../styles/Sidebar.css";

// export default function Sidebar() {
//   const [collapsed, setCollapsed] = useState(false);

//   const menu = [
//     { label: "Dashboard", icon: <Home size={20} />, to: "/admin" },
//     { label: "Users", icon: <Users size={20} />, to: "/admin/users" },
//     { label: "Projects", icon: <Box size={20} />, to: "/admin/projects" },
//     { label: "Requests", icon: <MessageSquare size={20} />, to: "/admin/request-demo" },
//     { label: "Contacts", icon: <MessageSquare size={20} />, to: "/admin/contacts" },
//     { label: "Settings", icon: <Settings size={20} />, to: "/admin/settings" },
//   ];

//   return (
//     <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
//       {/* Sidebar Header */}
//       <div className="sidebar-top">
//         <h2 className="sidebar-logo">{!collapsed && "Yarrowtech Admin"}</h2>
        
//       </div>

//       {/* Sidebar Menu */}
//       <nav className="sidebar-nav">
//         {menu.map((item) => (
//           <NavLink
//             key={item.label}
//             to={item.to}
//             className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
//           >
//             {item.icon}
//             {!collapsed && <span>{item.label}</span>}
//           </NavLink>
//         ))}
//       </nav>
//     </aside>
//   );
// }









// import React from "react";
// import { Link } from "react-router-dom";
// // import "../../styles/Sidebar.css";
// import "../styles/Sidebar.css";

// export default function Sidebar() {
//   return (
//     <div className="sidebar">
//       <h2>Admin</h2>

//       <ul>
//         <li><Link to="/admin/dashboard">Dashboard</Link></li>
//         <li><Link to="/admin/projects">Projects</Link></li>
//         <li><Link to="/admin/requests">Demo Requests</Link></li>
//         <li><Link to="/admin/contacts">Contacts</Link></li>
//         <li><Link to="/admin/users">Users</Link></li>
//         <li><Link to="/admin/settings">Settings</Link></li>
//       </ul>

//     </div>
//   );
// }



import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>

      <ul className="sidebar-menu">
        <li>
          <NavLink to="/admin/dashboard" className="sidebar-link">
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/blogs" className="sidebar-link">
            Blogs
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/projects" className="sidebar-link">
            Projects
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/requests" className="sidebar-link">
            Demo Requests
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/contacts" className="sidebar-link">
            Contacts
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/users" className="sidebar-link">
            Users
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/settings" className="sidebar-link">
            Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
