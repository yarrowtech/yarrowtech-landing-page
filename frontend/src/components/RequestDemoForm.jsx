

// import React, { useState } from "react";
// import "./ModalForm.css";
// import { X } from "lucide-react";
// import axios from "axios";

// export default function RequestDemoForm({ onClose, showToast }) {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     company: "",
//     message: "",
//   });

//   const [loading, setLoading] = useState(false);

//   // 📌 Handle Form Submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // safety: ensure showToast is a function
//     const toastFn = typeof showToast === "function" ? showToast : (t, m) => console.log(t, m);

//     const token = localStorage.getItem("token");

//     if (!token) {
//       toastFn("error", "Please login first");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await axios.post(
//         "http://localhost:5000/api/forms/demo",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       toastFn("success", "Demo request submitted!");
//       setLoading(false);
//       onClose();
//     } catch (err) {
//       console.error("Request Demo Error:", err);

//       toastFn(
//         "error",
//         err.response?.data?.message || "Failed to submit request"
//       );

//       setLoading(false);
//     }
//   };

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-box-demo" onClick={(e) => e.stopPropagation()}>
//         {/* Close Button */}
//         <button className="close-btn" onClick={onClose}>
//           <X size={22} />
//         </button>

//         <h2 className="modal-title">Request a Demo</h2>
//         <p className="modal-subtitle">
//           Tell us about yourself and your company.
//         </p>

//         {/* FORM */}
//         <form className="demo-form" onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="name"
//             placeholder="Your Name"
//             required
//             onChange={(e) =>
//               setFormData({ ...formData, name: e.target.value })
//             }
//           />

//           <input
//             type="email"
//             name="email"
//             placeholder="Your Email"
//             required
//             onChange={(e) =>
//               setFormData({ ...formData, email: e.target.value })
//             }
//           />

//           <input
//             type="text"
//             name="company"
//             placeholder="Company Name"
//             onChange={(e) =>
//               setFormData({ ...formData, company: e.target.value })
//             }
//           />

//           <textarea
//             name="message"
//             rows="4"
//             placeholder="Your Message"
//             onChange={(e) =>
//               setFormData({ ...formData, message: e.target.value })
//             }
//           ></textarea>

//           <div className="form-action-buttons">
//             <button type="submit" className="primary-btn" disabled={loading}>
//               {loading ? "Submitting..." : "Submit Request"}
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
import "./ModalForm.css";
import { X } from "lucide-react";
import axios from "axios";

export default function RequestDemoForm({ onClose, showToast }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // 📌 Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastFn =
      typeof showToast === "function" ? showToast : (t, m) => console.log(t, m);

    const token = localStorage.getItem("token");

    if (!token) {
      toastFn("error", "Please login first");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/forms/demo",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toastFn("success", "Demo request submitted!");
      setLoading(false);
      onClose();
    } catch (err) {
      console.error("Request Demo Error:", err);

      toastFn(
        "error",
        err.response?.data?.message || "Failed to submit request"
      );

      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box-demo two-column-demo" onClick={(e) => e.stopPropagation()}>
        
        {/* LEFT FORM SIDE */}
        <div className="demo-form-side">
          <button className="close-btn" onClick={onClose}>
            <X size={22} />
          </button>

          <h2 className="modal-title">Request a Demo</h2>
          <p className="modal-subtitle">
            Tell us about yourself and your company.
          </p>

          <form className="demo-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <input
              type="text"
              name="company"
              placeholder="Company Name"
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
            />

            <textarea
              name="message"
              rows="4"
              placeholder="Your Message"
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            ></textarea>

            <div className="form-action-buttons">
              <button type="submit" className="primary-btn" disabled={loading}>
                {loading ? "Submitting..." : "Submit Request"}
              </button>

              <button type="button" className="secondary-btn" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT INFORMATION PANEL */}
        <div className="demo-info-side">
          <h3 className="info-title">What Happens After You Reach Out?</h3>
          <p className="info-sub">
            See how we move from your initial inquiry to a smooth project kickoff.
          </p>

          <div className="info-step">
            <div className="info-icon">📩</div>
            <div>
              <h4>Initial Response</h4>
              <p>
                You’ll receive a confirmation email with an NDA and our portfolio
                within minutes.
              </p>
            </div>
          </div>

          <div className="info-step">
            <div className="info-icon">📞</div>
            <div>
              <h4>Discovery Call</h4>
              <p>
                After the NDA is signed, we schedule a call to understand your requirements.
              </p>
            </div>
          </div>

          <div className="info-step">
            <div className="info-icon">📝</div>
            <div>
              <h4>Requirement Gathering & Proposal</h4>
              <p>
                We prepare a complete proposal including scope, pricing, and timeline.
              </p>
            </div>
          </div>

          <div className="info-step">
            <div className="info-icon">🚀</div>
            <div>
              <h4>Project Kickoff</h4>
              <p>
                Once approved, development begins as per the planned roadmap.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
