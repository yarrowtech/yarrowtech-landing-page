// import React, { useState } from "react";
// import "./ModalForm.css";
// import { X } from "lucide-react";

// export default function RequestDemoForm({ onClose }) {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     company: "",
//     message: "",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Request Demo Submitted:", formData);
//     onClose();
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

//         <form onSubmit={handleSubmit} className="demo-form">
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
//             rows={4}
//             placeholder="Your Message"
//             onChange={(e) =>
//               setFormData({ ...formData, message: e.target.value })
//             }
//           ></textarea>

//           <div className="form-action-buttons">
//             <button type="submit" className="primary-btn">
//               Submit Request
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

    // safety: ensure showToast is a function
    const toastFn = typeof showToast === "function" ? showToast : (t, m) => console.log(t, m);

    const token = localStorage.getItem("token");

    if (!token) {
      toastFn("error", "Please login first");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/forms/request-demo",
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
      <div className="modal-box-demo" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="close-btn" onClick={onClose}>
          <X size={22} />
        </button>

        <h2 className="modal-title">Request a Demo</h2>
        <p className="modal-subtitle">
          Tell us about yourself and your company.
        </p>

        {/* FORM */}
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
    </div>
  );
}
