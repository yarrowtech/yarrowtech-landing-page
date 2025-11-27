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










// import React, { useState } from "react";
// import "./CareerForm.css";
// import { Upload, X } from "lucide-react";
// import axios from "axios";

// export default function CareerForm({ onClose, showToast }) {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//     resume: null,
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData({ ...formData, [name]: files ? files[0] : value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//       if (!formData.resume) {
//     showToast("error", "Please upload your resume");
//     return;
//   }

//     try {
//       setLoading(true);

//       const token = localStorage.getItem("token");

//       if (!token) {
//         showToast("error", "Please login first");
//         setLoading(false);   
//         return;
//       }

//       const data = new FormData();
//       data.append("name", formData.name);
//       data.append("email", formData.email);
//       data.append("message", formData.message);
//       data.append("resume", formData.resume);

//       const res = await axios.post(
//         "http://localhost:5000/api/career",
//         data,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       showToast("success", "Application submitted successfully!");

//       onClose();
//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       showToast(
//         "error",
//         err.response?.data?.message || "Failed to submit application"
//       );
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-box-career" onClick={(e) => e.stopPropagation()}>
//         {/* CLOSE BUTTON */}
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
//               {formData.resume
//                 ? formData.resume.name
//                 : "Upload Resume (PDF / DOC)"}
//             </span>

//             <input
//               type="file"
//               name="resume"
//               accept=".pdf,.doc,.docx"
//               // required
//               onChange={handleChange}
//             />
//           </label>

//           <div className="form-action-buttons">
//             <button type="submit" className="primary-btn" disabled={loading}>
//               {loading ? "Submitting..." : "Submit Application"}
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




// import React, { useState } from "react";
// import "./CareerForm.css";
// import { Upload, X } from "lucide-react";
// import axios from "axios";

// export default function CareerForm({ onClose, showToast }) {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//     resume: null,
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData({ ...formData, [name]: files ? files[0] : value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.resume) {
//       showToast("error", "Please upload your resume");
//       return;
//     }

//     try {
//       setLoading(true);

//       const data = new FormData();
//       data.append("name", formData.name);
//       data.append("email", formData.email);
//       data.append("message", formData.message);
//       data.append("resume", formData.resume);

//       // 🚀 FIX → No token, no Authorization header
//       const res = await axios.post(
//         "http://localhost:5000/api/career",
//         data,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       showToast("success", "Application submitted successfully!");

//       onClose();
//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       showToast(
//         "error",
//         err.response?.data?.message || "Failed to submit application"
//       );
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-box-career" onClick={(e) => e.stopPropagation()}>
//         {/* CLOSE BUTTON */}
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
//               {formData.resume
//                 ? formData.resume.name
//                 : "Upload Resume (PDF / DOC)"}
//             </span>

//             <input
//               type="file"
//               name="resume"
//               accept=".pdf,.doc,.docx"
//               onChange={handleChange}
//             />
//           </label>

//           <div className="form-action-buttons">
//             <button type="submit" className="primary-btn" disabled={loading}>
//               {loading ? "Submitting..." : "Submit Application"}
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

const API_BASE =
  (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000").replace(
    /\/+$/,
    ""
  );

export default function CareerForm({ onClose, showToast }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    resume: null,
  });

  const [loading, setLoading] = useState(false);

  const toastFn =
    typeof showToast === "function"
      ? showToast
      : (type, msg) => console.log(type, msg);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.resume) {
      toastFn("error", "Name, Email and Resume are required.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("message", formData.message || "");
    data.append("resume", formData.resume); // must be "resume" (matches backend)

    try {
      setLoading(true);

      const res = await axios.post(`${API_BASE}/api/career`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toastFn("success", res?.data?.message || "Application submitted!");
      setLoading(false);
      onClose?.();
    } catch (err) {
      console.error("Career form submit error:", err);

      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to submit application. Please try again.";

      toastFn("error", msg);
      setLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    // prevent accidental close if click inside modal
    if (e.target.classList.contains("modal-overlay")) {
      onClose?.();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-box-career" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <h2 className="modal-title">Join Our Team</h2>
        <p className="modal-subtitle">
          Fill in your details and upload your resume. Our team will get back
          to you.
        </p>

        <form className="career-form" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-group">
            <label htmlFor="career-name">Full Name</label>
            <input
              id="career-name"
              name="name"
              type="text"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="career-email">Email</label>
            <input
              id="career-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Message */}
          <div className="form-group">
            <label htmlFor="career-message">Message (optional)</label>
            <textarea
              id="career-message"
              name="message"
              rows={4}
              placeholder="Tell us about your experience or the role you're looking for..."
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          {/* Resume Upload */}
          <div className="form-group">
            <label>Upload Resume (PDF / DOC / DOCX)</label>
            <label className="file-input-label">
              <Upload size={18} />
              <span>
                {formData.resume ? formData.resume.name : "Choose file"}
              </span>
              <input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
              />
            </label>
          </div>

          {/* Buttons */}
          <div className="form-action-buttons">
            <button
              type="submit"
              className="primary-btn"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
            <button
              type="button"
              className="secondary-btn"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
