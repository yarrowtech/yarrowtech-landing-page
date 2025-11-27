import React from "react";
import "../../styles/TechprojectUpdates.css";

export default function ProjectUpdates() {
  return (
    <div className="project-updates">

      <div className="page-title">Project Updates</div>

      <div className="update-list">
        <div className="update-card">
          <h3>E-Commerce App</h3>
          <p>Backend API development completed. Testing in progress.</p>
          <span>Last Updated: 3 hours ago</span>
        </div>

        <div className="update-card">
          <h3>Restaurant Dashboard</h3>
          <p>UI redesign complete. Payment module pending.</p>
          <span>Last Updated: Yesterday</span>
        </div>

        <div className="update-card">
          <h3>Client CRM Panel</h3>
          <p>Authentication merging with admin panel.</p>
          <span>Last Updated: 2 days ago</span>
        </div>
      </div>

    </div>
  );
}
