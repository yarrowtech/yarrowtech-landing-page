import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import ManagerSidebar from "../../components/ManagerSidebar";
import ManagerNavbar from "../../components/ManagerNavbar";
import "../../styles/ManagerLayout.css";

export default function ManagerLayout() {
  const location = useLocation();

  // ❌ Hide sidebar ONLY on CRM (Request Demo) page
  const hideSidebar = location.pathname === "/manager/requests";

  return (
    <div className="manager-layout">
      {!hideSidebar && <ManagerSidebar />}

      <div className="manager-content">
        <ManagerNavbar />

        <div className="manager-inner">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
