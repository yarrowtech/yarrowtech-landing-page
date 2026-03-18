// import React, { useState } from "react";
// import "./ModalForm.css";
// import { X } from "lucide-react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function RequestDemoForm({ onClose, showToast }) {
//   const isModal = !!onClose;
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     company: "",
//     message: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const toastFn =
//     typeof showToast === "function" ? showToast : (t, m) => console.log(t, m);

//   // ✅ Handle input change (clean)
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // ✅ Handle submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem("token");

//     if (!token) {
//       toastFn("error", "Please login first");

//       setTimeout(() => {
//         navigate("/erp");
//       }, 1500);

//       return;
//     }

//     try {
//       setLoading(true);

//       await axios.post(
//         `${import.meta.env.VITE_API_URL}/api/forms/demo`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       toastFn("success", "Demo request submitted!");

//       // ✅ Reset form
//       setFormData({
//         name: "",
//         email: "",
//         company: "",
//         message: "",
//       });

//       setTimeout(() => {
//         if (isModal) {
//           onClose();
//         } else {
//           navigate("/");
//         }
//       }, 1000);
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
//     <div
//       className={isModal ? "modal-overlay" : "page-wrapper"}
//       onClick={() => isModal && onClose()}
//     >
//       <div
//         className="modal-box-demo two-column-demo"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* LEFT SIDE */}
//         <div className="demo-form-side">
//           {isModal && (
//             <button className="close-btn" onClick={onClose}>
//               <X size={22} />
//             </button>
//           )}

//           <h2 className="modal-title">Request a Demo</h2>
//           <p className="modal-subtitle">
//             Tell us about yourself and your company.
//           </p>

//           <form className="demo-form" onSubmit={handleSubmit}>
//             <input
//               type="text"
//               name="name"
//               placeholder="Your Name"
//               required
//               value={formData.name}
//               onChange={handleChange}
//             />

//             <input
//               type="email"
//               name="email"
//               placeholder="Your Email"
//               required
//               value={formData.email}
//               onChange={handleChange}
//             />

//             <input
//               type="text"
//               name="company"
//               placeholder="Company Name"
//               value={formData.company}
//               onChange={handleChange}
//             />

//             <textarea
//               name="message"
//               rows="4"
//               placeholder="Your Message"
//               value={formData.message}
//               onChange={handleChange}
//             ></textarea>

//             <div className="form-action-buttons">
//               <button type="submit" className="primary-btn" disabled={loading}>
//                 {loading ? "Submitting..." : "Submit Request"}
//               </button>

//               <button
//                 type="button"
//                 className="secondary-btn"
//                 onClick={() => {
//                   if (isModal) onClose();
//                   else navigate("/");
//                 }}
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="demo-info-side">
//           <h3 className="info-title">
//             How We Turn Your Idea Into a Working Product
//           </h3>
//           <p className="info-sub">
//             A clear look at the steps we follow to move from your initial request
//             to project kickoff.
//           </p>

//           {[
//             {
//               icon: "📨",
//               title: "Quick Acknowledgement",
//               desc: "You’ll receive a confirmation email shortly, along with a confidentiality agreement and overview.",
//             },
//             {
//               icon: "📞",
//               title: "Introductory Discussion",
//               desc: "We schedule a call to understand your requirements.",
//             },
//             {
//               icon: "📋",
//               title: "Solution Planning",
//               desc: "We prepare proposal with timeline & cost.",
//             },
//             {
//               icon: "🚀",
//               title: "Project Initiation",
//               desc: "Development begins after approval.",
//             },
//           ].map((step, i) => (
//             <div className="info-step" key={i}>
//               <div className="info-icon">{step.icon}</div>
//               <div>
//                 <h4>{step.title}</h4>
//                 <p>{step.desc}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }







import React, { useState } from "react";
import "./ModalForm.css";
import { X } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function RequestDemoForm({ onClose, showToast }) {
  const isModal = !!onClose;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const toastFn =
    typeof showToast === "function" ? showToast : (t, m) => console.log(t, m);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      toastFn("error", "Please login first");

      setTimeout(() => {
        navigate("/erp");
      }, 1500);

      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/forms/demo`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toastFn("success", "Demo request submitted!");

      setFormData({
        name: "",
        email: "",
        company: "",
        message: "",
      });

      setTimeout(() => {
        if (isModal) onClose();
        else navigate("/");
      }, 1000);
    } catch (err) {
      console.error("Request Demo Error:", err);

      toastFn(
        "error",
        err.response?.data?.message || "Failed to submit request"
      );

      setLoading(false);
    }
  };

  const steps = [
    {
      icon: "📨",
      title: "Quick Acknowledgement",
      desc: "You’ll receive a confirmation email shortly, along with a confidentiality agreement.",
    },
    {
      icon: "📞",
      title: "Introductory Discussion",
      desc: "We schedule a call to understand your requirements.",
    },
    {
      icon: "📋",
      title: "Solution Planning",
      desc: "We prepare proposal with timeline & cost.",
    },
    {
      icon: "🚀",
      title: "Project Initiation",
      desc: "Development begins after approval.",
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        className={isModal ? "modal-overlay" : "page-wrapper"}
        onClick={() => isModal && onClose()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="modal-box-demo two-column-demo"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {/* LEFT SIDE */}
          <div className="demo-form-side">
            {isModal && (
              <button className="close-btn" onClick={onClose}>
                <X size={22} />
              </button>
            )}

            <motion.h2
              className="modal-title"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Request a Demo
            </motion.h2>

            <motion.p
              className="modal-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Tell us about yourself and your company.
            </motion.p>

            <form className="demo-form" onSubmit={handleSubmit}>
              {["name", "email", "company"].map((field, i) => (
                <motion.input
                  key={field}
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  placeholder={
                    field === "name"
                      ? "Your Name"
                      : field === "email"
                      ? "Your Email"
                      : "Company Name"
                  }
                  value={formData[field]}
                  onChange={handleChange}
                  required={field !== "company"}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                />
              ))}

              <motion.textarea
                name="message"
                rows="4"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              />

              <div className="form-action-buttons">
                <motion.button
                  type="submit"
                  className="primary-btn"
                  disabled={loading}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {loading ? "Submitting..." : "Submit Request"}
                </motion.button>

                <motion.button
                  type="button"
                  className="secondary-btn"
                  onClick={() => {
                    if (isModal) onClose();
                    else navigate("/");
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </div>

          {/* RIGHT SIDE */}
          <div className="demo-info-side">
            <motion.h3
              className="info-title"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              How We Turn Your Idea Into a Working Product
            </motion.h3>

            <motion.p
              className="info-sub"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              A clear look at the steps we follow to move from your initial request to project kickoff.
            </motion.p>

            {steps.map((step, i) => (
              <motion.div
                className="info-step"
                key={i}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.15 }}
              >
                <div className="info-icon">{step.icon}</div>
                <div>
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

