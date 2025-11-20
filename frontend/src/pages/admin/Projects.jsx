import React, { useEffect, useState } from "react";
import "../../styles/AdminProject.css";
import { Edit, Trash2, Eye } from "lucide-react";

// Temporary local data (mock projects)
const mockProjects = [
  {
    _id: "1",
    projectId: "PRJ001",
    title: "Food & Beverage ERP System",
    clientName: "ABC Foods Pvt Ltd",
    managerName: "Anshika Sharma",
    status: "Ongoing",
    progress: 70,
    expectedDeliveryDate: "2025-12-01",
  },
  {
    _id: "2",
    projectId: "PRJ002",
    title: "Restaurant POS Web App",
    clientName: "Cafe 24x7",
    managerName: "Rohit Singh",
    status: "Completed",
    progress: 100,
    expectedDeliveryDate: "2025-08-25",
  },
  {
    _id: "3",
    projectId: "PRJ003",
    title: "Hotel Booking Portal",
    clientName: "BlueMoon Hotels",
    managerName: "Niharika Jain",
    status: "Pending",
    progress: 20,
    expectedDeliveryDate: "2026-02-15",
  },
];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setProjects(mockProjects);
      setLoading(false);
    }, 500); // faster load
  }, []);

  return (
    <div className="admin-projects-container">
      <div className="admin-header">
        <h2>Projects Overview</h2>
        <p className="subtitle">Monitor all client projects and progress</p>
      </div>

      {/* Skeleton Loader */}
      {loading ? (
        <div className="skeleton-table-wrapper">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="skeleton-row"></div>
          ))}
        </div>
      ) : (
        <div className="projects-table-wrapper">
          <table className="projects-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Project Name</th>
                <th>Client</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Assigned Manager</th>
                <th>Expected Delivery</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {projects.map((proj) => (
                <tr key={proj._id}>
                  <td>{proj.projectId}</td>
                  <td>{proj.title}</td>
                  <td>{proj.clientName}</td>

                  <td
                    className={`status 
                      ${proj.status === "Completed"
                        ? "status-completed"
                        : proj.status === "Ongoing"
                        ? "status-ongoing"
                        : "status-pending"
                      }`}
                  >
                    {proj.status}
                  </td>

                  <td>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${proj.progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">{proj.progress}%</span>
                  </td>

                  <td>{proj.managerName}</td>
                  <td>{proj.expectedDeliveryDate}</td>

                  <td className="actions">
                    <button className="view-btn">
                      <Eye size={18} />
                    </button>
                    <button className="edit-btn">
                      <Edit size={18} />
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => alert(`Deleted ${proj.title}`)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
