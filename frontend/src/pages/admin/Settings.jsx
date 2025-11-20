import React from 'react';
import '../../styles/Admin.css';

export default function Settings() {
  return (
    <div className="admin-page">
      <h1>Settings</h1>
      <div className="card" style={{ maxWidth: 700 }}>
        <h3>Admin Profile</h3>
        <p>Update name, email, and password (form implementation for backend connection later).</p>
      </div>
    </div>
  );
}
