import React, { useState } from "react";
import "../../styles/ManagerProjects.css";

export default function ManageProjects() {
  const [projects] = useState([
    { id: "PRJ001", name: "Food ERP System", status: "Ongoing" },
    { id: "PRJ002", name: "POS Web App", status: "Completed" },
  ]);

  return (
    <div className="manager-page">
      <h2>Manage Projects</h2>

      <table className="manager-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Project Name</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {projects.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
