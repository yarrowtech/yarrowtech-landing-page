import React from "react";
import "../../styles/ManagerDashboard.css";
import { Users, FolderKanban, Bell, CheckCircle } from "lucide-react";

export default function ManagerDashboard() {
  return (
    <div className="manager-dashboard">
      <div className="dashboard-header">
        <h2>Dashboard Overview</h2>
        <p>Quick insights into your clients, projects, and activities.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Users size={28} />
          </div>
          <h3>38</h3>
          <p>Total Clients</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FolderKanban size={28} />
          </div>
          <h3>24</h3>
          <p>Active Projects</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <CheckCircle size={28} />
          </div>
          <h3>12</h3>
          <p>Completed</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Bell size={28} />
          </div>
          <h3>5</h3>
          <p>Notifications</p>
        </div>
      </div>

      <div className="recent-section">
        <h3>Recent Activity</h3>

        <div className="recent-card">
          <p>✨ New client <strong>Rahul Sharma</strong> added by Manager</p>
          <span>3 hours ago</span>
        </div>

        <div className="recent-card">
          <p>📁 New project <strong>Yarrow Finance App</strong> created</p>
          <span>6 hours ago</span>
        </div>

        <div className="recent-card">
          <p>💬 Client <strong>Neha Verma</strong> requested support</p>
          <span>1 day ago</span>
        </div>
      </div>
    </div>
  );
}
