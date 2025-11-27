import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

/* 🌐 Public Website Components */
import Header from "./components/Header";
import Hero from "./components/Hero";
import Service from "./pages/services";
import Products from "./pages/products";
import Contact from "./pages/contact";
import Expertise from "./pages/expertise";
import About from "./pages/about";
import ScrollProgress from "./components/ScrollProgress";
import SectionRouteRedirect from "./components/SectionRouteRedirect";
import Footer from "./components/Footer";

/* 🧩 Admin Module */
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users";
import Projects from "./pages/admin/Projects";
import RequestDemoAdmin from "./pages/admin/RequestDemoAdmin";
import ContactsAdmin from "./pages/admin/ContactsAdmin";
import Settings from "./pages/admin/Settings";

/* 🧩 Manager Module */
import ManagerLayout from "./pages/manager/ManagerLayout";
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import ManageProjects from "./pages/manager/ManageProjects";
import CreateClient from "./pages/manager/CreateClient";
import Notifications from "./pages/manager/Notifications";
import ManagerSettings from "./pages/manager/Settings";

/* 🧩 Client Module */
import ClientLayout from "./pages/client/ClientLayout";
import ClientDashboard from "./pages/client/ClientDashboard";
import MyProjects from "./pages/client/MyProjects";
import Payments from "./pages/client/Payments";
import ProjectHistory from "./pages/client/ProjectHistory";
import Profile from "./pages/client/Profile";

/* 🧩 Technical Lead Module (NEW) */
import TechnicalLayout from "./pages/technical/TechnicalLayout";
import TechnicalDashboard from "./pages/technical/TechnicalDashboard";
import ProjectUpdates from "./pages/technical/ProjectUpdates";
import TeamOverview from "./pages/technical/TeamOverview";
import TechnicalProfile from "./pages/technical/TechnicalProfile";

/* 🔔 Notification System */
import { Toaster } from "react-hot-toast";

/* Styles */
import "./App.css";
import "./styles/Admin.css";

/* ----------------------------- */
/* HOME (Public) */
/* ----------------------------- */
function Home() {
  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, "", "/#");
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <>
      <Hero />
      <Service />
      <Products />
      <Expertise />
      <About />
      <Contact />
      <Footer />
    </>
  );
}

/* ----------------------------- */
/* MAIN APP */
/* ----------------------------- */
export default function App() {
  return (
    <Router>
      <div className="app">
        <Routes>

          {/* 🌍 PUBLIC ROUTES */}
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
                <ScrollProgress />
              </>
            }
          />

          {/* Smooth Scrolling Sections */}
          {["services", "products", "expertise", "about", "contact", "footer"].map((sec) => (
            <Route
              key={sec}
              path={`/${sec}`}
              element={
                <>
                  <Header />
                  <SectionRouteRedirect sectionId={sec} />
                </>
              }
            />
          ))}

          {/* 🧱 ADMIN ROUTES */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="projects" element={<Projects />} />
            <Route path="request-demo" element={<RequestDemoAdmin />} />
            <Route path="contacts" element={<ContactsAdmin />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* 🧱 MANAGER ROUTES */}
          <Route path="/manager" element={<ManagerLayout />}>
            <Route index element={<ManagerDashboard />} />
            <Route path="projects" element={<ManageProjects />} />
            <Route path="create-client" element={<CreateClient />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<ManagerSettings />} />
          </Route>

          {/* 🧱 ⭐ TECHNICAL LEAD ROUTES (NEW) */}
          <Route path="/technical" element={<TechnicalLayout />}>
            <Route index element={<TechnicalDashboard />} />
            <Route path="dashboard" element={<TechnicalDashboard />} />
            <Route path="project-updates" element={<ProjectUpdates />} />
            <Route path="team-overview" element={<TeamOverview />} />
            <Route path="profile" element={<TechnicalProfile />} />
          </Route>

          {/* 🧱 CLIENT ROUTES */}
          <Route path="/client" element={<ClientLayout />}>
            <Route index element={<ClientDashboard />} />
            <Route path="dashboard" element={<ClientDashboard />} />
            <Route path="projects" element={<MyProjects />} />
            <Route path="payments" element={<Payments />} />
            <Route path="history" element={<ProjectHistory />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* 404 FALLBACK */}
          <Route
            path="*"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
        </Routes>

        <Toaster position="top-right" />
      </div>
    </Router>
  );
}
