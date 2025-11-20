// // import React, { useEffect, useRef, useState } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import Lottie from "lottie-react";
// // import "./Header.css";
// // import logoAnimation from "../assets/logo2.json";

// // import CareerForm from "../components/CareerForm";
// // import RequestDemoForm from "../components/RequestDemoForm";

// // const NAV_LINKS = [
// //   { label: "Home", hash: "" },
// //   { label: "Services", hash: "#services" },
// //   { label: "Products", hash: "#products" },
// //   { label: "Expertise", hash: "#expertise" },
// //   { label: "About", hash: "#about" },
// //   { label: "Career", hash: "#career" },
  
// // ];

// // export default function Header() {
// //   const [menuOpen, setMenuOpen] = useState(false);
// //   const [activeHash, setActiveHash] = useState("");

// //   const [showLogin, setShowLogin] = useState(false);
// //   const [showSignup, setShowSignup] = useState(false);
// //   const [showForgot, setShowForgot] = useState(false);
// //   const [showCareer, setShowCareer] = useState(false);
// //   const [showRequestDemo, setShowRequestDemo] = useState(false);

// //   const [toast, setToast] = useState(null);

// //   const wrapRef = useRef(null);

// //   const toggleMenu = () => setMenuOpen((p) => !p);
// //   const closeMenu = () => setMenuOpen(false);

// //   const handleNav = (e, hash) => {
// //     e.preventDefault();
// //     closeMenu();

// //     // OPEN CAREER FORM
// //     if (hash === "#career") {
// //       setShowCareer(true);
// //       return;
// //     }

// //     if (!hash) {
// //       history.replaceState?.(null, "", "/#");
// //       window.scrollTo({ top: 0, behavior: "smooth" });
// //       setActiveHash("");
// //       return;
// //     }

// //     const id = hash.slice(1);
// //     const el = document.getElementById(id);
// //     if (el) {
// //       el.scrollIntoView({ behavior: "smooth", block: "start" });
// //       history.replaceState?.(null, "", `/#${id}`);
// //       setActiveHash(hash);
// //     }
// //   };

// //   // Scroll spy
// //   useEffect(() => {
// //     const ids = NAV_LINKS.map((l) => l.hash.slice(1)).filter(Boolean);
// //     const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
// //     if (!els.length) return;

// //     const io = new IntersectionObserver(
// //       (entries) => {
// //         const visible = entries
// //           .filter((e) => e.isIntersecting)
// //           .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

// //         if (visible[0]?.target?.id) {
// //           setActiveHash(`#${visible[0].target.id}`);
// //         }
// //       },
// //       { rootMargin: "-100px 0px -55% 0px", threshold: [0.3, 0.6, 0.9] }
// //     );

// //     els.forEach((el) => io.observe(el));
// //     return () => io.disconnect();
// //   }, []);

// //   // Modal animation
// //   const modalAnim = {
// //     initial: { scale: 0.8, opacity: 0, y: 40 },
// //     animate: { scale: 1, opacity: 1, y: 0 },
// //     exit: { scale: 0.8, opacity: 0, y: 40 },
// //     transition: { duration: 0.3 },
// //   };

// //   // Toast function
// //   const showToast = (type, message) => {
// //     setToast({ type, message });
// //     setTimeout(() => setToast(null), 3000);
// //   };

// //   // Simulated submit handlers
// //   const handleLogin = (e) => {
// //     e.preventDefault();
// //     setShowLogin(false);
// //     showToast("success", "Logged in successfully!");
// //   };

// //   const handleSignup = (e) => {
// //     e.preventDefault();
// //     setShowSignup(false);
// //     showToast("success", "Account created successfully!");
// //   };

// //   const handleForgot = (e) => {
// //     e.preventDefault();
// //     setShowForgot(false);
// //     showToast("success", "Password reset link sent!");
// //   };

// //   return (
// //     <>
// //       <header className="header" ref={wrapRef}>
// //         <div className="header-container">
// //           <a href="/" className="logo">
// //             <Lottie animationData={logoAnimation} loop autoplay />
// //           </a>

// //           <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
// //             {NAV_LINKS.map(({ label, hash }) => (
// //               <a
// //                 key={label}
// //                 href={hash || "/#"}
// //                 onClick={(e) => handleNav(e, hash)}
// //                 className={`nav-link ${activeHash === (hash || "") ? "active" : ""}`}
// //               >
// //                 {label}
// //               </a>
// //             ))}
// //           </nav>

// //           <div className="header-buttons">
// //             <button
// //               className="contact-btn"
// //               onClick={(e) => handleNav(e, "#contact")}
// //             >
// //               Contact Us
// //             </button>

// //             <button
// //               className="request-btn"
// //               onClick={() => setShowRequestDemo(true)}
// //             >
// //               Request Demo
// //             </button>

// //             <button
// //               className="login-btn"
// //               onClick={() => setShowLogin(true)}
// //             >
// //               Login
// //             </button>
// //           </div>

// //           <button
// //             className={`hamburger ${menuOpen ? "active" : ""}`}
// //             onClick={toggleMenu}
// //           >
// //             <span></span>
// //             <span></span>
// //             <span></span>
// //           </button>
// //         </div>
// //       </header>

// //       {/* ---------- CAREER MODAL ---------- */}
// //       <AnimatePresence>
// //         {showCareer && (
// //           <motion.div
// //             className="modal-overlay"
// //             onClick={() => setShowCareer(false)}
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             exit={{ opacity: 0 }}
// //           >
// //             <motion.div
// //               className="modal"
// //               onClick={(e) => e.stopPropagation()}
// //               {...modalAnim}
// //             >
// //               <CareerForm onClose={() => setShowCareer(false)} />
// //             </motion.div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>

// //       {/* ---------- REQUEST DEMO MODAL ---------- */}
// //       <AnimatePresence>
// //         {showRequestDemo && (
// //           <motion.div
// //             className="modal-overlay"
// //             onClick={() => setShowRequestDemo(false)}
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             exit={{ opacity: 0 }}
// //           >
// //             <motion.div
// //               className="modal"
// //               onClick={(e) => e.stopPropagation()}
// //               {...modalAnim}
// //             >
// //               <RequestDemoForm onClose={() => setShowRequestDemo(false)} />
// //             </motion.div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>

// //       {/* ---------- LOGIN MODAL ---------- */}
// //       <AnimatePresence>
// //         {showLogin && (
// //           <motion.div
// //             className="modal-overlay"
// //             onClick={() => setShowLogin(false)}
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             exit={{ opacity: 0 }}
// //           >
// //             <motion.div className="modal" onClick={(e) => e.stopPropagation()} {...modalAnim}>
// //               <h2>Login</h2>
// //               <form className="modal-form" onSubmit={handleLogin}>
// //                 <label>Email</label>
// //                 <input type="email" required placeholder="Enter your email" />
// //                 <label>Password</label>
// //                 <input type="password" required placeholder="Enter your password" />
// //                 <button className="submit-btn">Login</button>
// //               </form>

// //               <div className="modal-links">
// //                 <button
// //                   className="link-btn"
// //                   onClick={() => {
// //                     setShowLogin(false);
// //                     setShowForgot(true);
// //                   }}
// //                 >
// //                   Forgot Password?
// //                 </button>

// //                 <p>
// //                   Don’t have an account?{" "}
// //                   <button
// //                     className="link-btn"
// //                     onClick={() => {
// //                       setShowLogin(false);
// //                       setShowSignup(true);
// //                     }}
// //                   >
// //                     Create Account
// //                   </button>
// //                 </p>
// //               </div>
// //             </motion.div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>

// //       {/* ---------- SIGNUP MODAL ---------- */}
// //       <AnimatePresence>
// //         {showSignup && (
// //           <motion.div
// //             className="modal-overlay"
// //             onClick={() => setShowSignup(false)}
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             exit={{ opacity: 0 }}
// //           >
// //             <motion.div className="modal" onClick={(e) => e.stopPropagation()} {...modalAnim}>
// //               <h2>Create Account</h2>
// //               <form className="modal-form" onSubmit={handleSignup}>
// //                 <label>Name</label>
// //                 <input type="text" required placeholder="Enter your name" />

// //                 <label>Email</label>
// //                 <input type="email" required placeholder="Enter your email" />

// //                 <label>Password</label>
// //                 <input type="password" required placeholder="Enter your password" />

// //                 <label>Confirm Password</label>
// //                 <input type="password" required placeholder="Confirm your password" />

// //                 <button className="submit-btn">Create Account</button>
// //               </form>

// //               <div className="modal-links">
// //                 <p>
// //                   Already have an account?{" "}
// //                   <button
// //                     className="link-btn"
// //                     onClick={() => {
// //                       setShowSignup(false);
// //                       setShowLogin(true);
// //                     }}
// //                   >
// //                     Login
// //                   </button>
// //                 </p>
// //               </div>
// //             </motion.div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>

// //       {/* ---------- FORGOT PASSWORD MODAL ---------- */}
// //       <AnimatePresence>
// //         {showForgot && (
// //           <motion.div
// //             className="modal-overlay"
// //             onClick={() => setShowForgot(false)}
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             exit={{ opacity: 0 }}
// //           >
// //             <motion.div className="modal" onClick={(e) => e.stopPropagation()} {...modalAnim}>
// //               <h2>Reset Password</h2>
// //               <form className="modal-form" onSubmit={handleForgot}>
// //                 <label>Email</label>
// //                 <input type="email" required placeholder="Enter your email" />
// //                 <button className="submit-btn">Send Reset Link</button>
// //               </form>

// //               <div className="modal-links">
// //                 <p>
// //                   Remember your password?{" "}
// //                   <button
// //                     className="link-btn"
// //                     onClick={() => {
// //                       setShowForgot(false);
// //                       setShowLogin(true);
// //                     }}
// //                   >
// //                     Back to Login
// //                   </button>
// //                 </p>
// //               </div>
// //             </motion.div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>

// //       {/* ---------- TOAST ---------- */}
// //       <AnimatePresence>
// //         {toast && (
// //           <motion.div
// //             className={`toast ${toast.type}`}
// //             initial={{ y: -30, opacity: 0 }}
// //             animate={{ y: 0, opacity: 1 }}
// //             exit={{ y: -30, opacity: 0 }}
// //             transition={{ duration: 0.3 }}
// //           >
// //             {toast.message}
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //     </>
// //   );
// // }














// import React, { useEffect, useRef, useState } from "react";
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
//   const [showForgot, setShowForgot] = useState(false);
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

//   const wrapRef = useRef(null);

//   // Load user on refresh
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const userData = localStorage.getItem("user");

//     if (token && userData) {
//       setUser(JSON.parse(userData));
//     }
//   }, []);

//   // Toast function
//   const showToastMessage = (type, message) => {
//     setToast({ type, message });
//     setTimeout(() => setToast(null), 3000);
//   };

//   //------------------------------------
//   // LOGIN API
//   //------------------------------------
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
//       showToastMessage("success", "Login successful!");
//     } catch (err) {
//       showToastMessage("error", err.response?.data?.message || "Login failed!");
//     }
//   };

//   //------------------------------------
//   // SIGNUP API
//   //------------------------------------
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
//       showToastMessage("error", err.response?.data?.message || "Signup failed!");
//     }
//   };

//   //------------------------------------
//   // GOOGLE AUTH API
//   //------------------------------------
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

//       showToastMessage("success", "Google login successful!");
//     } catch (err) {
//       showToastMessage("error", "Google login failed");
//     }
//   };

//   //------------------------------------
//   // LOGOUT USER
//   //------------------------------------
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//     setUser(null);
//     setShowProfileMenu(false);

//     showToastMessage("success", "Logged out!");
//   };

//   //------------------------------------
//   // OPEN SECTIONS
//   //------------------------------------
//   const handleNav = (e, hash) => {
//     e.preventDefault();
//     setMenuOpen(false);

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

//   //------------------------------------
//   // Modal Animation
//   //------------------------------------
//   const modalAnim = {
//     initial: { scale: 0.85, opacity: 0, y: 40 },
//     animate: { scale: 1, opacity: 1, y: 0 },
//     exit: { scale: 0.85, opacity: 0, y: 40 },
//     transition: { duration: 0.25 },
//   };

//   return (
//     <>
//       {/* HEADER */}
//       <header className="header" ref={wrapRef}>
//         <div className="header-container">
//           <a href="/" className="logo">
//             <Lottie animationData={logoAnimation} loop autoplay />
//           </a>

//          {/* NAV LINKS */}
// <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
//   {NAV_LINKS.map(({ label, hash }) => (
//     <a
//       key={label}
//       href={hash}
//       onClick={(e) => handleNav(e, hash)}
//       className={`nav-link ${activeHash === hash ? "active" : ""}`}
//     >
//       {label}
//     </a>
//   ))}

//   {/* MOBILE ONLY BUTTONS */}
//   <div className="mobile-buttons">
//     <button className="contact-btn" onClick={(e) => handleNav(e, "#contact")}>
//       Contact Us
//     </button>

//     <button className="request-btn" onClick={() => setShowRequestDemo(true)}>
//       Request Demo
//     </button>

//     {user ? (
//       <>
//         <p className="mobile-user-name">{user.name}</p>
//         <button className="logout-btn" onClick={handleLogout}>
//           Logout
//         </button>
//       </>
//     ) : (
//       <button className="login-btn" onClick={() => setShowLogin(true)}>
//         Login
//       </button>
//     )}
//   </div>
// </nav>


//           {/* RIGHT SIDE BUTTONS */}
//           <div className="header-buttons">
//             <button
//               className="contact-btn"
//               onClick={(e) => handleNav(e, "#contact")}
//             >
//               Contact Us
//             </button>

//             <button
//               className="request-btn"
//               onClick={() => setShowRequestDemo(true)}
//             >
//               Request Demo
//             </button>

//             {user ? (
//               <div className="user-box">
//                 <img
//                   src={user.avatar || "https://avatar.iran.liara.run/public"}
//                   className="navbar-user-avatar"
//                   onClick={() =>
//                     setShowProfileMenu((prev) => !prev)
//                   }
//                 />

//                 {showProfileMenu && (
//                   <div className="profile-dropdown">
//                     <p id="username" className="user-name">{user.name}</p>
//                     <button className="logout-btn" onClick={handleLogout}>
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <button
//                 className="login-btn"
//                 onClick={() => setShowLogin(true)}
//               >
//                 Login
//               </button>
//             )}
//           </div>

//           <button
//             className="hamburger"
//             onClick={() => setMenuOpen((prev) => !prev)}
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
//               <h2>Login</h2>

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

//                 <button className="submit-btn">Login</button>
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
//               <h2>Create Account</h2>

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

//                 <button className="submit-btn">Create Account</button>
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
//               onClose={() => setShowCareer(false)}
//               showToast={showToastMessage} />
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

  // Load user on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Toast helper
  const showToastMessage = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  // --------------------------- LOGIN API --------------------------- //
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: loginEmail,
        password: loginPassword,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);

      setShowLogin(false);
      setShowProfileMenu(false);
      showToastMessage("success", "Login successful!");
    } catch (err) {
      showToastMessage(
        "error",
        err.response?.data?.message || "Login failed!"
      );
    }
  };

  // --------------------------- SIGNUP API --------------------------- //
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
      showToastMessage(
        "error",
        err.response?.data?.message || "Signup failed!"
      );
    }
  };

  // --------------------------- GOOGLE AUTH --------------------------- //
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
      setShowProfileMenu(false);

      showToastMessage("success", "Google login successful!");
    } catch (err) {
      showToastMessage("error", "Google login failed");
    }
  };

  // --------------------------- LOGOUT --------------------------- //
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setShowProfileMenu(false);

    showToastMessage("success", "Logged out!");
  };

  // --------------------------- NAVIGATION --------------------------- //
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

    if (!hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.getElementById(hash.replace("#", ""));
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  // --------------------------- MODAL ANIMATION --------------------------- //
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
          {/* LOGO */}
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
                className={`nav-link ${
                  activeHash === hash ? "active" : ""
                }`}
              >
                {label}
              </a>
            ))}

            {/* MOBILE ONLY BUTTONS (inside slide menu) */}
            <div className="mobile-buttons">
              <button
                className="btn contact-btn"
                onClick={(e) => handleNav(e, "#contact")}
              >
                Contact Us
              </button>

              {/* <button
                className="btn request-btn"
                onClick={() => setShowRequestDemo(true)}
              >
                Request Demo
              </button> */}


              <button
  className="btn request-btn"
  onClick={() => {
    setShowRequestDemo(true);
    setMenuOpen(false); // ✅ close mobile nav
  }}
>
  Request Demo
</button>


              {user ? (
                <>
                  <p className="mobile-user-name">
                    {user.name || "User"}
                  </p>
                  <button
                    className="logout-btn"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
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

          {/* RIGHT SIDE BUTTONS (DESKTOP/TABLET) */}
          <div className="header-buttons">
            <button
              className="btn contact-btn"
              onClick={(e) => handleNav(e, "#contact")}
            >
              Contact Us
            </button>

            <button
              className="btn request-btn"
              onClick={() => setShowRequestDemo(true)}
            >
              Request Demo
            </button>

            {user ? (
              <div className="user-box">
                <img
                  src={user.avatar || "https://avatar.iran.liara.run/public"}
                  className="navbar-user-avatar"
                  alt={user.name || "User avatar"}
                  onClick={() =>
                    setShowProfileMenu((prev) => !prev)
                  }
                />

                {showProfileMenu && (
                  <div className="profile-dropdown">
                    <p id="username" className="user-name">
                      {user.name}
                    </p>
                    <button
                      className="logout-btn"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                className="btn login-btn"
                onClick={() => setShowLogin(true)}
              >
                Login
              </button>
            )}
          </div>

          {/* HAMBURGER (MOBILE) */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* ----------------------------- LOGIN MODAL ----------------------------- */}
      <AnimatePresence>
        {showLogin && (
          <motion.div
            className="modal-overlay"
            onClick={() => setShowLogin(false)}
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

              <form className="modal-form" onSubmit={handleLogin}>
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />

                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />

                <button className="submit-btn" type="submit">
                  Login
                </button>
              </form>

              <div className="google-auth-box">
                <GoogleLogin
                  onSuccess={(res) =>
                    handleGoogleAuth(res.credential)
                  }
                  onError={() =>
                    showToastMessage("error", "Google login failed")
                  }
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ----------------------------- SIGNUP MODAL ----------------------------- */}
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
                    setSignupData({
                      ...signupData,
                      name: e.target.value,
                    })
                  }
                />

                <label>Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData({
                      ...signupData,
                      email: e.target.value,
                    })
                  }
                />

                <label>Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={signupData.password}
                  onChange={(e) =>
                    setSignupData({
                      ...signupData,
                      password: e.target.value,
                    })
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
                  onSuccess={(res) =>
                    handleGoogleAuth(res.credential)
                  }
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

      {/* ----------------------------- CAREER MODAL ----------------------------- */}
      <AnimatePresence>
        {showCareer && (
          <motion.div
            className="modal-overlay"
            onClick={() => setShowCareer(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal"
              onClick={(e) => e.stopPropagation()}
              {...modalAnim}
            >
              <CareerForm
                onClose={() => setShowCareer(false)}
                showToast={showToastMessage}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ----------------------------- REQUEST DEMO MODAL ----------------------------- */}
      <AnimatePresence>
        {showRequestDemo && (
          <motion.div
            className="modal-overlay"
            onClick={() => setShowRequestDemo(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal"
              onClick={(e) => e.stopPropagation()}
              {...modalAnim}
            >
              <RequestDemoForm
                onClose={() => setShowRequestDemo(false)}
                showToast={showToastMessage}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ----------------------------- TOAST ----------------------------- */}
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

