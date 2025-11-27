import React, { useState } from "react";
import "../../styles/ClientProfile.css";

export default function ClientProfile() {
  // EXAMPLE PROFILE (Replace with API data later)
  const [profile, setProfile] = useState({
    name: "Rohit Sharma",
    email: "rohit@gmail.com",
    company: "Yarrowtech Pvt. Ltd.",
    clientId: "CL-2025-0021",
    registered: "2025-02-14",
    phone: "+91 9876543210",
    address: "Lucknow, India",
  });

  const updateProfile = () => {
    alert("Profile updated successfully! (Backend pending)");
  };

  return (
    <div className="client-profile-container">
      {/* Header */}
      <div className="client-header">
        <h2>My Profile</h2>
        <p className="subtitle">View or update your personal contact details</p>
      </div>

      <div className="client-profile-card">

        <div className="client-profile-form">

          {/* NON-EDITABLE FIELDS */}
          <div className="form-group">
            <label>Name (Assigned by Manager)</label>
            <input value={profile.name} disabled />
          </div>

          <div className="form-group">
            <label>Email (Registered Email)</label>
            <input value={profile.email} disabled />
          </div>

          <div className="form-group">
            <label>Company</label>
            <input value={profile.company} disabled />
          </div>

          <div className="form-group">
            <label>Client ID</label>
            <input value={profile.clientId} disabled />
          </div>

          <div className="form-group">
            <label>Registered On</label>
            <input value={profile.registered} disabled />
          </div>

          {/* EDITABLE FIELDS */}
          <div className="form-group">
            <label>Phone</label>
            <input
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea
              rows="3"
              value={profile.address}
              onChange={(e) =>
                setProfile({ ...profile, address: e.target.value })
              }
            ></textarea>
          </div>

          <button className="client-profile-save-btn" onClick={updateProfile}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
