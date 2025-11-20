import React from "react";
import "../../styles/ContactAdmin.css";

export default function ContactAdmin() {
  const contacts = [
    {
      id: 1,
      name: "Rohit Verma",
      email: "rohit@gmail.com",
      subject: "General Inquiry",
      message: "I want to know more about your ERP system.",
      date: "2025-11-10",
      status: "new",
    },
    {
      id: 2,
      name: "Anshika Sharma",
      email: "anshika@domain.com",
      subject: "Support Needed",
      message: "I need help with integrating API.",
      date: "2025-11-09",
      status: "viewed",
    },
  ];

  return (
    <div className="admin-contact-container">
      {/* Header */}
      <div className="admin-header">
        <h2>Contact Form Submissions</h2>
        <p className="subtitle">Total Contacts: {contacts.length}</p>
      </div>

      {/* Table */}
      <div className="contact-table-wrapper">
        <table className="contact-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {contacts.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.subject}</td>
                <td className="truncate">{c.message}</td>
                <td>{c.date}</td>

                <td>
                  <span
                    className={`status ${
                      c.status === "new" ? "status-new" : "status-viewed"
                    }`}
                  >
                    {c.status}
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
