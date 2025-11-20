import React from "react";
import "../../styles/RequestDemoAdmin.css";

export default function RequestDemoAdmin() {
  const requests = [
    {
      id: 1,
      name: "Rohit",
      email: "rohit@gmail.com",
      company: "Yarrowtech",
      date: "2025-11-10",
      status: "new",
    },
    {
      id: 2,
      name: "Anshika",
      email: "anshika@domain.com",
      company: "TechFlow",
      date: "2025-11-09",
      status: "viewed",
    },
  ];

  return (
    <div className="admin-requests-container">
      {/* Header */}
      <div className="admin-header">
        <h2>Request Demo Submissions</h2>
        <p className="subtitle">Total Requests: {requests.length}</p>
      </div>

      {/* Table */}
      <div className="requests-table-wrapper">
        <table className="requests-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.name}</td>
                <td>{req.email}</td>
                <td>{req.company}</td>
                <td>{req.date}</td>

                <td>
                  <span
                    className={`status ${
                      req.status === "new" ? "status-new" : "status-viewed"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>

                <td className="actions">
                  <button className="view-btn">View</button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
