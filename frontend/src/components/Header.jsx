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
  // { label: "Blog", route: "/blogs", isBlog: true },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showCareer, setShowCareer] = useState(false);
  const [showRequestDemo, setShowRequestDemo] = useState(false);

  const [toast, setToast] = useState(null);

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

  const [isErpLogin, setIsErpLogin] = useState(false);
  const [erpModeVisible, setErpModeVisible] = useState(false);

  // ⭐ Make Request Demo modal function globally available for Hero
  if (typeof window !== "undefined") {
    window.openFreeTrialModal = () => setShowRequestDemo(true);
  }

  // Load user on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Secret unlock for ERP login
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

  const showToastMessage = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (isErpLogin) {
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
      }

      // Normal login
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

  // SIGNUP
  const handleSignup = async (e) => {
    e.preventDefault();

    if (signupData.password !== signupData.confirmPassword) {
      showToastMessage("error", "Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", signupData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setUser(res.data.user);
      setShowSignup(false);

      showToastMessage("success", "Account created!");

    } catch (err) {
      showToastMessage("error", err.response?.data?.message || "Signup failed!");
    }
  };

  // GOOGLE AUTH
  const handleGoogleAuth = async (credential) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/google", { credential });

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

  // LOGOUT
  const handleLogout = () => {
    localStorage.clear();
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

          {/* NAVIGATION MENU */}
          <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
            {NAV_LINKS.map((item) =>
  item.isBlog ? (
    <a
      key={item.label}
      href={item.route}
      className="nav-link"
    >
      {item.label}
    </a>
  ) : (
    <a
      key={item.label}
      href={item.hash}
      onClick={(e) => handleNav(e, item.hash)}
      className={`nav-link ${activeHash === item.hash ? "active" : ""}`}
    >
      {item.label}
    </a>
  )
)}


            {/* MOBILE BUTTONS */}
            <div className="mobile-buttons">

              <button className="btn contact-btn" onClick={(e) => handleNav(e, "#contact")}>
                Contact Us
              </button>

              {/* ❌ REMOVED GET FREE TRIAL FROM MOBILE HEADER */}

              {user ? (
                <>
                  <p className="mobile-user-name">{user.name}</p>
                  <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <button className="btn login-btn" onClick={() => {
                  setShowLogin(true);
                  setMenuOpen(false);
                }}>
                  Login
                </button>
              )}
            </div>
          </nav>

          {/* RIGHT (DESKTOP) BUTTONS */}
          <div className="header-buttons">

            <button className="btn contact-btn" onClick={(e) => handleNav(e, "#contact")}>
              Contact Us
            </button>

            {/* ❌ REMOVED GET FREE TRIAL FROM DESKTOP HEADER */}

            {user ? (
              <div className="user-box">
                <img
                  src={user.avatar || "https://avatar.iran.liara.run/public"}
                  className="navbar-user-avatar"
                  alt="avatar"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
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

          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span></span><span></span><span></span>
          </button>

        </div>
      </header>

{/* BLOG STRIP BELOW HEADER */}
{/* <div className="blog-strip">
  <div className="blog-strip-container">
    <span className="blog-strip-label">
      ✍️ Read our latest insights & product updates
    </span>

    <a href="/blogs" className="blog-strip-btn">
      Visit Blog →
    </a>
  </div>
</div> */}

      {/* MODALS */}
      <AnimatePresence>
        {showLogin && (
          <motion.div className="modal-overlay" onClick={() => setShowLogin(false)}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal" onClick={(e) => e.stopPropagation()} {...modalAnim}>
              <h2 className="modal-title">Login</h2>

              {erpModeVisible && (
                <div className="login-switch">
                  <button className={`switch-btn ${!isErpLogin ? "active" : ""}`} onClick={() => setIsErpLogin(false)}>Website Login</button>
                  <button className={`switch-btn ${isErpLogin ? "active" : ""}`} onClick={() => setIsErpLogin(true)}>ERP Login</button>
                </div>
              )}

              <form className="modal-form" onSubmit={handleLogin}>
                <label>Email</label>
                <input type="email" required autoComplete="username"
                  value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />

                <label>Password</label>
                <input type="password" required autoComplete="current-password"
                  value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />

                <button className="submit-btn" type="submit">Login</button>
              </form>

              {!isErpLogin && (
                <>
                  <div className="google-auth-box">
                    <GoogleLogin onSuccess={(res) => handleGoogleAuth(res.credential)} />
                  </div>

                  <div className="modal-links">
                    <p>
                      Don’t have an account?
                      <button className="link-btn" onClick={() => {
                        setShowLogin(false);
                        setShowSignup(true);
                      }}>Create Account</button>
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SIGNUP */}
      <AnimatePresence>
        {showSignup && (
          <motion.div className="modal-overlay" onClick={() => setShowSignup(false)}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

            <motion.div className="modal" onClick={(e) => e.stopPropagation()} {...modalAnim}>
              <h2 className="modal-title">Create Account</h2>

              <form className="modal-form" onSubmit={handleSignup}>
                <label>Name</label>
                <input type="text" required
                  value={signupData.name} onChange={(e) => setSignupData({ ...signupData, name: e.target.value })} />

                <label>Email</label>
                <input type="email" required
                  value={signupData.email} onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} />

                <label>Password</label>
                <input type="password" required
                  value={signupData.password} onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} />

                <label>Confirm Password</label>
                <input type="password" required
                  value={signupData.confirmPassword}
                  onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })} />

                <button className="submit-btn" type="submit">Create Account</button>
              </form>

              <div className="google-auth-box">
                <GoogleLogin onSuccess={(res) => handleGoogleAuth(res.credential)} />
              </div>

              <div className="modal-links">
                <p>
                  Already have an account?
                  <button className="link-btn" onClick={() => {
                    setShowSignup(false);
                    setShowLogin(true);
                  }}>
                    Login
                  </button>
                </p>
              </div>

            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* CAREER FORM */}
      <AnimatePresence>
        {showCareer && (
          <motion.div className="modal-overlay" onClick={() => setShowCareer(false)}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal" onClick={(e) => e.stopPropagation()} {...modalAnim}>
              <CareerForm onClose={() => setShowCareer(false)} showToast={showToastMessage} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* REQUEST DEMO FORM */}
      <AnimatePresence>
        {showRequestDemo && (
          <motion.div className="modal-overlay" onClick={() => setShowRequestDemo(false)}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal" onClick={(e) => e.stopPropagation()} {...modalAnim}>
              <RequestDemoForm onClose={() => setShowRequestDemo(false)} showToast={showToastMessage} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div className={`toast ${toast.type}`}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}>
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}





