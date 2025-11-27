import React from "react";
import "../../styles/technicalProfile.css";

export default function TechnicalProfile() {
  return (
    <div className="technical-profile">

      <h2 className="page-title">Technical Lead Profile</h2>

      <div className="profile-card">
        
        <div className="profile-left">
          <img 
            src="https://via.placeholder.com/150" 
            alt="Profile" 
            className="profile-img"
          />
          <h3 className="profile-name">Technical Lead</h3>
          <p className="profile-role">Full Stack Developer</p>
        </div>

        <div className="profile-right">
          <div className="field-group">
            <label>Full Name</label>
            <input type="text" placeholder="John Doe" />
          </div>

          <div className="field-group">
            <label>Email</label>
            <input type="email" placeholder="john@example.com" />
          </div>

          <div className="field-group">
            <label>Phone</label>
            <input type="text" placeholder="+91 9876543210" />
          </div>

          <div className="field-group">
            <label>Designation</label>
            <input type="text" placeholder="Technical Lead" />
          </div>

          <div className="field-group">
            <label>Bio</label>
            <textarea rows="4" placeholder="Short introduction about yourself..." />
          </div>

          <button className="save-btn">Save Changes</button>
        </div>

      </div>
    </div>
  );
}
