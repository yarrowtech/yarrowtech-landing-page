import React from "react";
import "../../styles/technicalDashboard.css";

export default function TechnicalDashboard() {
  return (
    <div className="technical-dashboard">

      <div className="page-title">Technical Dashboard</div>

      <div className="dashboard-grid">
        <div className="card">Active Projects: 12</div>
        <div className="card">Team Members: 28</div>
        <div className="card">Pending Tasks: 34</div>
        <div className="card">This Month Deployment: 5</div>
      </div>

    </div>
  );
}
