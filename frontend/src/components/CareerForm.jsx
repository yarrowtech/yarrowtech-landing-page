// import React, { useState } from "react";
// import "./CareerForm.css";
// import { Upload, X } from "lucide-react";

// export default function CareerForm({ onClose }) {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//     resume: null,
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData({ ...formData, [name]: files ? files[0] : value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Career Form Submitted:", formData);
//     onClose();
//   };

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-box-career" onClick={(e) => e.stopPropagation()}>
        
//         {/* CLOSE BUTTON FIXED */}
//         <button className="close-btn" onClick={onClose}>
//           <X size={22} />
//         </button>

//         <h2 className="modal-title">Join Our Team</h2>
//         <p className="modal-subtitle">
//           Fill the details below and upload your resume.
//         </p>

//         <form onSubmit={handleSubmit} className="career-form">
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             required
//             onChange={handleChange}
//           />

//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             required
//             onChange={handleChange}
//           />

//           <textarea
//             name="message"
//             placeholder="Message / Cover Letter"
//             rows={4}
//             onChange={handleChange}
//           />

//           {/* UPLOAD BOX */}
//           <label className="resume-upload">
//             <Upload size={20} />
//             <span>
//               {formData.resume ? formData.resume.name : "Upload Resume (PDF / DOC)"}
//             </span>

//             <input
//               type="file"
//               name="resume"
//               accept=".pdf,.doc,.docx"
//               onChange={handleChange}
//             />
//           </label>

//           <div className="form-action-buttons">
//             <button type="submit" className="primary-btn">
//               Submit Application
//             </button>

//             <button type="button" className="secondary-btn" onClick={onClose}>
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }










import React, { useState } from "react";
import "./CareerForm.css";
import { Upload, X } from "lucide-react";
import axios from "axios";

export default function CareerForm({ onClose, showToast }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    resume: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        showToast("error", "Please login first");
        return;
      }

      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("message", formData.message);
      data.append("resume", formData.resume);

      const res = await axios.post(
        "http://localhost:5000/api/forms/career",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showToast("success", "Application submitted successfully!");

      onClose();
      setLoading(false);
    } catch (err) {
      console.error(err);
      showToast(
        "error",
        err.response?.data?.message || "Failed to submit application"
      );
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box-career" onClick={(e) => e.stopPropagation()}>
        {/* CLOSE BUTTON */}
        <button className="close-btn" onClick={onClose}>
          <X size={22} />
        </button>

        <h2 className="modal-title">Join Our Team</h2>
        <p className="modal-subtitle">
          Fill the details below and upload your resume.
        </p>

        <form onSubmit={handleSubmit} className="career-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            onChange={handleChange}
          />

          <textarea
            name="message"
            placeholder="Message / Cover Letter"
            rows={4}
            onChange={handleChange}
          />

          {/* UPLOAD BOX */}
          <label className="resume-upload">
            <Upload size={20} />
            <span>
              {formData.resume
                ? formData.resume.name
                : "Upload Resume (PDF / DOC)"}
            </span>

            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              required
              onChange={handleChange}
            />
          </label>

          <div className="form-action-buttons">
            <button type="submit" className="primary-btn" disabled={loading}>
              {loading ? "Submitting..." : "Submit Application"}
            </button>

            <button type="button" className="secondary-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
