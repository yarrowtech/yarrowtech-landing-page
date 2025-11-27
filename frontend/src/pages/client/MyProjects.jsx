import React from "react";
import "../../styles/ClientMyProject.css";

export default function ClientMyProjects() {
  // SAMPLE DATA (Replace with API later)
  const projects = [
    {
      id: 1,
      name: "Yarrowtech Website",
      manager: "Anshika",
      startDate: "2025-01-10",
      progress: 85,
      status: "completed",
    },
    {
      id: 2,
      name: "CRM Dashboard",
      manager: "Rohit",
      startDate: "2025-02-15",
      progress: 60,
      status: "ongoing",
    },
    {
      id: 3,
      name: "Billing System",
      manager: "Neeraj",
      startDate: "2025-03-01",
      progress: 25,
      status: "pending",
    },
  ];

  return (
    <div className="client-projects-container">
      {/* Header */}
      <div className="client-header">
        <h2>My Projects</h2>
        <p className="subtitle">Track all your project details here</p>
      </div>

      {/* Table */}
      <div className="client-projects-table-wrapper">
        <table className="client-projects-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Project</th>
              <th>Manager</th>
              <th>Start Date</th>
              <th>Progress</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.manager}</td>
                <td>{p.startDate}</td>

                <td>
                  <div className="client-progress-bar">
                    <div
                      className="client-progress-fill"
                      style={{ width: `${p.progress}%` }}
                    ></div>
                  </div>
                  <span className="client-progress-text">{p.progress}%</span>
                </td>

                <td>
                  <span
                    className={`client-status client-status-${p.status}`}
                  >
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
