
// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Lottie from "lottie-react";
// import axios from "axios";
// import { GoogleLogin } from "@react-oauth/google";

// import "./Header.css";
// import logoAnimation from "../assets/logo2.json";

// import CareerForm from "../components/CareerForm";
// import RequestDemoForm from "../components/RequestDemoForm.jsx";

// const NAV_LINKS = [
//   { label: "Home", hash: "" },
//   { label: "Services", hash: "#services" },
//   { label: "Products", hash: "#products" },
//   { label: "Expertise", hash: "#expertise" },
//   { label: "About", hash: "#about" },
//   { label: "Career", hash: "#career" },
// ];

// export default function Header() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [activeHash, setActiveHash] = useState("");

//   const [showLogin, setShowLogin] = useState(false);
//   const [showSignup, setShowSignup] = useState(false);
//   const [showCareer, setShowCareer] = useState(false);
//   const [showRequestDemo, setShowRequestDemo] = useState(false);

//   const [toast, setToast] = useState(null);

//   // AUTH STATES
//   const [user, setUser] = useState(null);
//   const [showProfileMenu, setShowProfileMenu] = useState(false);

//   const [loginEmail, setLoginEmail] = useState("");
//   const [loginPassword, setLoginPassword] = useState("");

//   const [signupData, setSignupData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   // Load user on refresh
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const userData = localStorage.getItem("user");

//     if (token && userData) {
//       setUser(JSON.parse(userData));
//     }
//   }, []);

//   // Toast helper
//   const showToastMessage = (type, message) => {
//     setToast({ type, message });
//     setTimeout(() => setToast(null), 3000);
//   };

//   // --------------------------- LOGIN API --------------------------- //
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", {
//         email: loginEmail,
//         password: loginPassword,
//       });

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));
//       setUser(res.data.user);

//       setShowLogin(false);
//       setShowProfileMenu(false);
//       showToastMessage("success", "Login successful!");
//     } catch (err) {
//       showToastMessage(
//         "error",
//         err.response?.data?.message || "Login failed!"
//       );
//     }
//   };

//   // --------------------------- SIGNUP API --------------------------- //
//   const handleSignup = async (e) => {
//     e.preventDefault();

//     if (signupData.password !== signupData.confirmPassword) {
//       showToastMessage("error", "Passwords do not match");
//       return;
//     }

//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/register", {
//         name: signupData.name,
//         email: signupData.email,
//         password: signupData.password,
//       });

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));
//       setUser(res.data.user);

//       setShowSignup(false);
//       showToastMessage("success", "Account created!");
//     } catch (err) {
//       showToastMessage(
//         "error",
//         err.response?.data?.message || "Signup failed!"
//       );
//     }
//   };

//   // --------------------------- GOOGLE AUTH --------------------------- //
//   const handleGoogleAuth = async (credential) => {
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/google", {
//         credential,
//       });

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));
//       setUser(res.data.user);

//       setShowLogin(false);
//       setShowSignup(false);
//       setShowProfileMenu(false);

//       showToastMessage("success", "Google login successful!");
//     } catch (err) {
//       showToastMessage("error", "Google login failed");
//     }
//   };

//   // --------------------------- LOGOUT --------------------------- //
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//     setUser(null);
//     setShowProfileMenu(false);

//     showToastMessage("success", "Logged out!");
//   };

//   // --------------------------- NAVIGATION --------------------------- //
//   const handleNav = (e, hash) => {
//     e.preventDefault();
//     setMenuOpen(false);
//     setActiveHash(hash || "");

//     if (hash === "#career") {
//       if (!user) {
//         showToastMessage("error", "Please login first");
//         setShowLogin(true);
//         return;
//       }
//       setShowCareer(true);
//       return;
//     }

//     if (!hash) {
//       window.scrollTo({ top: 0, behavior: "smooth" });
//       return;
//     }

//     const element = document.getElementById(hash.replace("#", ""));
//     if (element) element.scrollIntoView({ behavior: "smooth" });
//   };

//   // --------------------------- MODAL ANIMATION --------------------------- //
//   const modalAnim = {
//     initial: { scale: 0.85, opacity: 0, y: 40 },
//     animate: { scale: 1, opacity: 1, y: 0 },
//     exit: { scale: 0.85, opacity: 0, y: 40 },
//     transition: { duration: 0.25 },
//   };

//   return (
//     <>
//       {/* HEADER */}
//       <header className="header">
//         <div className="header-container">
//           {/* LOGO */}
//           <a href="/" className="logo">
//             <Lottie animationData={logoAnimation} loop autoplay />
//           </a>

//           {/* NAV LINKS */}
//           <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
//             {NAV_LINKS.map(({ label, hash }) => (
//               <a
//                 key={label}
//                 href={hash}
//                 onClick={(e) => handleNav(e, hash)}
//                 className={`nav-link ${
//                   activeHash === hash ? "active" : ""
//                 }`}
//               >
//                 {label}
//               </a>
//             ))}

//             {/* MOBILE ONLY BUTTONS (inside slide menu) */}
//             <div className="mobile-buttons">
//               <button
//                 className="btn contact-btn"
//                 onClick={(e) => handleNav(e, "#contact")}
//               >
//                 Contact Us
//               </button>

//               {/* <button
//                 className="btn request-btn"
//                 onClick={() => setShowRequestDemo(true)}
//               >
//                 Request Demo
//               </button> */}


//               <button
//   className="btn request-btn"
//   onClick={() => {
//     setShowRequestDemo(true);
//     setMenuOpen(false); // ✅ close mobile nav
//   }}
// >
//   Request Demo
// </button>


//               {user ? (
//                 <>
//                   <p className="mobile-user-name">
//                     {user.name || "User"}
//                   </p>
//                   <button
//                     className="logout-btn"
//                     onClick={handleLogout}
//                   >
//                     Logout
//                   </button>
//                 </>
//               ) : (
//                 <button
//                   className="btn login-btn"
//                   onClick={() => {
//                     setShowLogin(true);
//                     setMenuOpen(false);
//                   }}
//                 >
//                   Login
//                 </button>
//               )}
//             </div>
//           </nav>

//           {/* RIGHT SIDE BUTTONS (DESKTOP/TABLET) */}
//           <div className="header-buttons">
//             <button
//               className="btn contact-btn"
//               onClick={(e) => handleNav(e, "#contact")}
//             >
//               Contact Us
//             </button>

//             <button
//               className="btn request-btn"
//               onClick={() => setShowRequestDemo(true)}
//             >
//               Request Demo
//             </button>

//             {user ? (
//               <div className="user-box">
//                 <img
//                   src={user.avatar || "https://avatar.iran.liara.run/public"}
//                   className="navbar-user-avatar"
//                   alt={user.name || "User avatar"}
//                   onClick={() =>
//                     setShowProfileMenu((prev) => !prev)
//                   }
//                 />

//                 {showProfileMenu && (
//                   <div className="profile-dropdown">
//                     <p id="username" className="user-name">
//                       {user.name}
//                     </p>
//                     <button
//                       className="logout-btn"
//                       onClick={handleLogout}
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <button
//                 className="btn login-btn"
//                 onClick={() => setShowLogin(true)}
//               >
//                 Login
//               </button>
//             )}
//           </div>

//           {/* HAMBURGER (MOBILE) */}
//           <button
//             className="hamburger"
//             onClick={() => setMenuOpen((prev) => !prev)}
//             aria-label="Toggle navigation"
//           >
//             <span></span>
//             <span></span>
//             <span></span>
//           </button>
//         </div>
//       </header>

//       {/* ----------------------------- LOGIN MODAL ----------------------------- */}
//       <AnimatePresence>
//         {showLogin && (
//           <motion.div
//             className="modal-overlay"
//             onClick={() => setShowLogin(false)}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="modal"
//               onClick={(e) => e.stopPropagation()}
//               {...modalAnim}
//             >
//               <h2 className="modal-title">Login</h2>

//               <form className="modal-form" onSubmit={handleLogin}>
//                 <label>Email</label>
//                 <input
//                   type="email"
//                   placeholder="Enter email"
//                   required
//                   value={loginEmail}
//                   onChange={(e) => setLoginEmail(e.target.value)}
//                 />

//                 <label>Password</label>
//                 <input
//                   type="password"
//                   placeholder="Enter password"
//                   required
//                   value={loginPassword}
//                   onChange={(e) => setLoginPassword(e.target.value)}
//                 />

//                 <button className="submit-btn" type="submit">
//                   Login
//                 </button>
//               </form>

//               <div className="google-auth-box">
//                 <GoogleLogin
//                   onSuccess={(res) =>
//                     handleGoogleAuth(res.credential)
//                   }
//                   onError={() =>
//                     showToastMessage("error", "Google login failed")
//                   }
//                 />
//               </div>

//               <div className="modal-links">
//                 <p>
//                   Don't have an account?{" "}
//                   <button
//                     className="link-btn"
//                     type="button"
//                     onClick={() => {
//                       setShowLogin(false);
//                       setShowSignup(true);
//                     }}
//                   >
//                     Create Account
//                   </button>
//                 </p>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* ----------------------------- SIGNUP MODAL ----------------------------- */}
//       <AnimatePresence>
//         {showSignup && (
//           <motion.div
//             className="modal-overlay"
//             onClick={() => setShowSignup(false)}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="modal"
//               onClick={(e) => e.stopPropagation()}
//               {...modalAnim}
//             >
//               <h2 className="modal-title">Create Account</h2>

//               <form className="modal-form" onSubmit={handleSignup}>
//                 <label>Name</label>
//                 <input
//                   type="text"
//                   placeholder="Full Name"
//                   required
//                   value={signupData.name}
//                   onChange={(e) =>
//                     setSignupData({
//                       ...signupData,
//                       name: e.target.value,
//                     })
//                   }
//                 />

//                 <label>Email</label>
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   required
//                   value={signupData.email}
//                   onChange={(e) =>
//                     setSignupData({
//                       ...signupData,
//                       email: e.target.value,
//                     })
//                   }
//                 />

//                 <label>Password</label>
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   required
//                   value={signupData.password}
//                   onChange={(e) =>
//                     setSignupData({
//                       ...signupData,
//                       password: e.target.value,
//                     })
//                   }
//                 />

//                 <label>Confirm Password</label>
//                 <input
//                   type="password"
//                   placeholder="Confirm Password"
//                   required
//                   value={signupData.confirmPassword}
//                   onChange={(e) =>
//                     setSignupData({
//                       ...signupData,
//                       confirmPassword: e.target.value,
//                     })
//                   }
//                 />

//                 <button className="submit-btn" type="submit">
//                   Create Account
//                 </button>
//               </form>

//               <div className="google-auth-box">
//                 <GoogleLogin
//                   onSuccess={(res) =>
//                     handleGoogleAuth(res.credential)
//                   }
//                   onError={() =>
//                     showToastMessage("error", "Google signup failed")
//                   }
//                 />
//               </div>

//               <div className="modal-links">
//                 <p>
//                   Already have an account?{" "}
//                   <button
//                     className="link-btn"
//                     type="button"
//                     onClick={() => {
//                       setShowSignup(false);
//                       setShowLogin(true);
//                     }}
//                   >
//                     Login
//                   </button>
//                 </p>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* ----------------------------- CAREER MODAL ----------------------------- */}
//       <AnimatePresence>
//         {showCareer && (
//           <motion.div
//             className="modal-overlay"
//             onClick={() => setShowCareer(false)}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="modal"
//               onClick={(e) => e.stopPropagation()}
//               {...modalAnim}
//             >
//               <CareerForm
//                 onClose={() => setShowCareer(false)}
//                 showToast={showToastMessage}
//               />
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* ----------------------------- REQUEST DEMO MODAL ----------------------------- */}
//       <AnimatePresence>
//         {showRequestDemo && (
//           <motion.div
//             className="modal-overlay"
//             onClick={() => setShowRequestDemo(false)}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="modal"
//               onClick={(e) => e.stopPropagation()}
//               {...modalAnim}
//             >
//               <RequestDemoForm
//                 onClose={() => setShowRequestDemo(false)}
//                 showToast={showToastMessage}
//               />
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* ----------------------------- TOAST ----------------------------- */}
//       <AnimatePresence>
//         {toast && (
//           <motion.div
//             className={`toast ${toast.type}`}
//             initial={{ y: -30, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             exit={{ y: -30, opacity: 0 }}
//           >
//             {toast.message}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }



import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

import "./Header.css";
import logoAnimation from "../assets/logo2.json";

import CareerForm from "../components/CareerForm";
import RequestDemoForm from "../components/RequestDemoForm.jsx";

const NAV_LINKS = [
  { label: "Home", hash: "" },
  { label: "Services", hash: "#services" },
  { label: "Products", hash: "#products" },
  { label: "Expertise", hash: "#expertise" },
  { label: "About", hash: "#about" },
  { label: "Career", hash: "#career" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showCareer, setShowCareer] = useState(false);
  const [showRequestDemo, setShowRequestDemo] = useState(false);

  const [toast, setToast] = useState(null);

  // AUTH STATES
  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // ⭐ ERP LOGIN MODE STATES
  const [isErpLogin, setIsErpLogin] = useState(false);
  const [erpModeVisible, setErpModeVisible] = useState(false); // hidden for normal users

  // Load user on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // ⭐ SECRET KEY: CTRL + SHIFT + E unlocks ERP login
  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === "E") {
        setErpModeVisible(true);
        setShowLogin(true);
        showToastMessage("success", "ERP Login Unlocked");
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Toast helper
  const showToastMessage = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  // ==============================
  // LOGIN HANDLER (ERP + NORMAL)
  // ==============================
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (isErpLogin) {
        // ⭐ ERP LOGIN
        const res = await axios.post("http://localhost:5000/api/erp/auth/login", {
          email: loginEmail,
          password: loginPassword,
        });

        localStorage.setItem("erp_token", res.data.token);
        localStorage.setItem("erp_role", res.data.role);

        setShowLogin(false);
        showToastMessage("success", "ERP Login successful!");

        if (res.data.role === "admin") return (window.location.href = "/admin/dashboard");
        if (res.data.role === "manager") return (window.location.href = "/manager/dashboard");
        if (res.data.role === "techlead") return (window.location.href = "/techlead/dashboard");
        if (res.data.role === "client") return (window.location.href = "/client/dashboard");

        return;
      }

      // ⭐ NORMAL USER LOGIN
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: loginEmail,
        password: loginPassword,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);

      setShowLogin(false);
      showToastMessage("success", "Login successful!");

    } catch (err) {
      showToastMessage("error", err.response?.data?.message || "Login failed!");
    }
  };

  // SIGNUP HANDLER (ONLY NORMAL USERS)
  const handleSignup = async (e) => {
    e.preventDefault();

    if (signupData.password !== signupData.confirmPassword) {
      showToastMessage("error", "Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name: signupData.name,
        email: signupData.email,
        password: signupData.password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setUser(res.data.user);
      setShowSignup(false);

      showToastMessage("success", "Account created!");

    } catch (err) {
      showToastMessage("error", err.response?.data?.message || "Signup failed!");
    }
  };

  // Google Auth (ONLY NORMAL USERS)
  const handleGoogleAuth = async (credential) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/google", {
        credential,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setUser(res.data.user);

      setShowLogin(false);
      setShowSignup(false);
      showToastMessage("success", "Google login successful!");

    } catch (err) {
      showToastMessage("error", "Google login failed");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("erp_token");
    localStorage.removeItem("erp_role");

    setUser(null);
    showToastMessage("success", "Logged out!");
  };

  // NAVIGATION
  const handleNav = (e, hash) => {
    e.preventDefault();
    setMenuOpen(false);
    setActiveHash(hash || "");

    if (hash === "#career") {
      if (!user) {
        showToastMessage("error", "Please login first");
        setShowLogin(true);
        return;
      }
      setShowCareer(true);
      return;
    }

    if (!hash) return window.scrollTo({ top: 0, behavior: "smooth" });

    const element = document.getElementById(hash.replace("#", ""));
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const modalAnim = {
    initial: { scale: 0.85, opacity: 0, y: 40 },
    animate: { scale: 1, opacity: 1, y: 0 },
    exit: { scale: 0.85, opacity: 0, y: 40 },
    transition: { duration: 0.25 },
  };

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="header-container">

          <a href="/" className="logo">
            <Lottie animationData={logoAnimation} loop autoplay />
          </a>

          {/* NAV LINKS */}
          <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
            {NAV_LINKS.map(({ label, hash }) => (
              <a
                key={label}
                href={hash}
                onClick={(e) => handleNav(e, hash)}
                className={`nav-link ${activeHash === hash ? "active" : ""}`}
              >
                {label}
              </a>
            ))}

            {/* MOBILE BUTTONS */}
            <div className="mobile-buttons">
              <button className="btn contact-btn" onClick={(e) => handleNav(e, "#contact")}>
                Contact Us
              </button>

              <button
                className="btn request-btn"
                onClick={() => {
                  setShowRequestDemo(true);
                  setMenuOpen(false);
                }}
              >
                Request Demo
              </button>

              {user ? (
                <>
                  <p className="mobile-user-name">{user.name}</p>
                  <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <button
                  className="btn login-btn"
                  onClick={() => {
                    setShowLogin(true);
                    setMenuOpen(false);
                  }}
                >
                  Login
                </button>
              )}
            </div>

          </nav>

          {/* RIGHT BUTTONS */}
          <div className="header-buttons">
            <button className="btn contact-btn" onClick={(e) => handleNav(e, "#contact")}>
              Contact Us
            </button>

            <button className="btn request-btn" onClick={() => setShowRequestDemo(true)}>
              Request Demo
            </button>

            {user ? (
              <div className="user-box">
                <img
                  src={user.avatar || "https://avatar.iran.liara.run/public"}
                  className="navbar-user-avatar"
                  alt="avatar"
                  onClick={() => setShowProfileMenu((prev) => !prev)}
                />

                {showProfileMenu && (
                  <div className="profile-dropdown">
                    <p className="user-name">{user.name}</p>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <button className="btn login-btn" onClick={() => setShowLogin(true)}>
                Login
              </button>
            )}
          </div>

          {/* HAMBURGER */}
          <button className="hamburger" onClick={() => setMenuOpen((prev) => !prev)}>
            <span></span><span></span><span></span>
          </button>

        </div>
      </header>

      {/* ====================== LOGIN MODAL ====================== */}
      <AnimatePresence>
        {showLogin && (
          <motion.div
            className="modal-overlay"
            onClick={() => {
              setShowLogin(false);
              setIsErpLogin(false);
              setErpModeVisible(false);
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >

            <motion.div
              className="modal"
              onClick={(e) => e.stopPropagation()}
              {...modalAnim}
            >

              <h2 className="modal-title">Login</h2>

              {/* ⭐ ERP login toggle appears ONLY when unlocked */}
        {erpModeVisible && (
  <div className="login-switch">
    <button
      type="button"
      className={`switch-btn ${!isErpLogin ? "active" : ""}`}
      onClick={() => setIsErpLogin(false)}
    >
      Website Login
    </button>

    <button
      type="button"
      className={`switch-btn ${isErpLogin ? "active" : ""}`}
      onClick={() => setIsErpLogin(true)}
    >
      ERP Login
    </button>
  </div>
)}

              <form className="modal-form" onSubmit={handleLogin}>
                <label>Email</label>
              <input
  type="email"
  placeholder="Enter email"
  required
  autoComplete="username"   // ✔ Correct autocomplete for login email
  value={loginEmail}
  onChange={(e) => setLoginEmail(e.target.value)}
/>

<label>Password</label>
<input
  type="password"
  placeholder="Enter password"
  required
  autoComplete="current-password"   // ✔ Correct autocomplete for login password
  value={loginPassword}
  onChange={(e) => setLoginPassword(e.target.value)}
/>


                <button className="submit-btn" type="submit">
                  Login
                </button>
              </form>

              {/* ⭐ Hide Google & Signup for ERP Login */}
              {!isErpLogin && (
                <>
                  <div className="google-auth-box">
                    <GoogleLogin
                      onSuccess={(res) => handleGoogleAuth(res.credential)}
                      onError={() => showToastMessage("error", "Google login failed")}
                    />
                  </div>

                  <div className="modal-links">
                    <p>
                      Don't have an account?{" "}
                      <button
                        className="link-btn"
                        type="button"
                        onClick={() => {
                          setShowLogin(false);
                          setShowSignup(true);
                        }}
                      >
                        Create Account
                      </button>
                    </p>
                  </div>
                </>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====================== SIGNUP MODAL ====================== */}
      <AnimatePresence>
        {showSignup && (
          <motion.div
            className="modal-overlay"
            onClick={() => setShowSignup(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal"
              onClick={(e) => e.stopPropagation()}
              {...modalAnim}
            >
              <h2 className="modal-title">Create Account</h2>

              <form className="modal-form" onSubmit={handleSignup}>
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={signupData.name}
                  onChange={(e) =>
                    setSignupData({ ...signupData, name: e.target.value })
                  }
                />

                <label>Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData({ ...signupData, email: e.target.value })
                  }
                />

                <label>Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={signupData.password}
                  onChange={(e) =>
                    setSignupData({ ...signupData, password: e.target.value })
                  }
                />

                <label>Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={signupData.confirmPassword}
                  onChange={(e) =>
                    setSignupData({
                      ...signupData,
                      confirmPassword: e.target.value,
                    })
                  }
                />

                <button className="submit-btn" type="submit">
                  Create Account
                </button>
              </form>

              <div className="google-auth-box">
                <GoogleLogin
                  onSuccess={(res) => handleGoogleAuth(res.credential)}
                  onError={() =>
                    showToastMessage("error", "Google signup failed")
                  }
                />
              </div>

              <div className="modal-links">
                <p>
                  Already have an account?{" "}
                  <button
                    className="link-btn"
                    type="button"
                    onClick={() => {
                      setShowSignup(false);
                      setShowLogin(true);
                    }}
                  >
                    Login
                  </button>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====================== OTHER MODALS (unchanged) ====================== */}

      <AnimatePresence>
        {showCareer && (
          <motion.div
            className="modal-overlay"
            onClick={() => setShowCareer(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="modal" onClick={(e) => e.stopPropagation()} {...modalAnim}>
              <CareerForm onClose={() => setShowCareer(false)} showToast={showToastMessage} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showRequestDemo && (
          <motion.div
            className="modal-overlay"
            onClick={() => setShowRequestDemo(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="modal" onClick={(e) => e.stopPropagation()} {...modalAnim}>
              <RequestDemoForm onClose={() => setShowRequestDemo(false)} showToast={showToastMessage} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====================== TOAST ====================== */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className={`toast ${toast.type}`}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}

