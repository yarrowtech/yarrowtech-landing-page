import React, { useState } from "react";
import "../../styles/ManagerCreateClient.css";
import { toast } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

export default function CreateClient() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    projectId: "",
    projectName: "",
    clientName: "",
    clientEmail: "",
    password: "",
  });

  const generatePassword = () => {
    const strongPwd =
      Math.random().toString(36).slice(-10) +
      Math.random().toString(36).toUpperCase().slice(-4);

    setFormData({ ...formData, password: strongPwd });
    toast.success("Strong password generated!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Client + Project created successfully!");

    console.log("Final Data:", formData);
  };

  return (
    <div className="manager-form-container pro">
      <h2 className="form-title">Create Client & Project</h2>
      <p className="form-subtitle">Enter client details to create a project</p>

      <form className="manager-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Project ID</label>
            <input
              type="text"
              placeholder="Enter unique project ID"
              onChange={(e) =>
                setFormData({ ...formData, projectId: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Project Name</label>
            <input
              type="text"
              placeholder="Enter project name"
              onChange={(e) =>
                setFormData({ ...formData, projectName: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Client Name</label>
            <input
              type="text"
              placeholder="Enter client full name"
              onChange={(e) =>
                setFormData({ ...formData, clientName: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Client Email</label>
            <input
              type="email"
              placeholder="Enter client email address"
              onChange={(e) =>
                setFormData({ ...formData, clientEmail: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group full">
            <label>Password</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Generate or type password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />

              <button
                type="button"
                className="icon-btn"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>

              <button
                type="button"
                className="generate-btn"
                onClick={generatePassword}
              >
                Generate
              </button>
            </div>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Create Account
        </button>
      </form>
    </div>
  );
}
