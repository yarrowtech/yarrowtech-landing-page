


// import React from "react";
// import { NavLink } from "react-router-dom";
// import "../styles/Sidebar.css";

// export default function Sidebar() {
//   return (
//     <div className="sidebar">
//       <h2 className="sidebar-title">Admin Panel</h2>

//       <ul className="sidebar-menu">
//         <li>
//           <NavLink to="/admin/dashboard" className="sidebar-link">
//             Dashboard
//           </NavLink>
//         </li>

//         <li>
//           <NavLink to="/admin/blogs" className="sidebar-link">
//             Blogs
//           </NavLink>
//         </li>

//         <li>
//           <NavLink to="/admin/projects" className="sidebar-link">
//             Projects
//           </NavLink>
//         </li>

//         <li>
//           <NavLink to="/admin/requests" className="sidebar-link">
//             Demo Requests
//           </NavLink>
//         </li>

//         <li>
//           <NavLink to="/admin/contacts" className="sidebar-link">
//             Contacts
//           </NavLink>
//         </li>

//         <li>
//           <NavLink to="/admin/users" className="sidebar-link">
//             Users
//           </NavLink>
//         </li>

//         <li>
//           <NavLink to="/admin/settings" className="sidebar-link">
//             Settings
//           </NavLink>
//         </li>
//       </ul>
//     </div>
//   );
// }




import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import API from "../services/axiosInstance";
import "../styles/Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // 🔹 Call backend logout (optional but you requested it)
      await API.post("/erp/auth/logout");
    } catch (err) {
      console.warn("Backend logout failed (safe to ignore)");
    } finally {
      // 🔹 Clear frontend auth
      localStorage.removeItem("erp_token");
      localStorage.removeItem("erp_role");
      localStorage.removeItem("erp_user");

      // 🔹 Redirect to HOME (✅ exists)
      navigate("/", { replace: true });
    }
  };

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

      {/* 🔴 LOGOUT BUTTON */}
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
