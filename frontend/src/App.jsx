import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* 🌐 PUBLIC WEBSITE */
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

/* 🔐 ERP PROTECTED ROUTE */
import ERPProtectedRoute from "./routes/ERPProtectedRoute";

/* 🧩 ADMIN MODULE */
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users";
import Projects from "./pages/admin/Projects";
import RequestDemoAdmin from "./pages/admin/RequestDemoAdmin";
import ContactsAdmin from "./pages/admin/ContactsAdmin";
import Settings from "./pages/admin/Settings";

/* 🧩 MANAGER MODULE */
import ManagerLayout from "./pages/manager/ManagerLayout";
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import ManageProjects from "./pages/manager/ManageProjects";
import CreateClient from "./pages/manager/CreateClient";
import Notifications from "./pages/manager/Notifications";
import ManagerSettings from "./pages/manager/Settings";

/* 🧩 TECHNICAL LEAD */
import TechnicalLayout from "./pages/technical/TechnicalLayout";
import TechnicalDashboard from "./pages/technical/TechnicalDashboard";
import ProjectUpdates from "./pages/technical/ProjectUpdates";
import TeamOverview from "./pages/technical/TeamOverview";
import TechnicalProfile from "./pages/technical/TechnicalProfile";

/* 🧩 CLIENT MODULE */
import ClientLayout from "./pages/client/ClientLayout";
import ClientDashboard from "./pages/client/ClientDashboard";
import MyProjects from "./pages/client/MyProjects";
import Payments from "./pages/client/Payments";
import ProjectHistory from "./pages/client/ProjectHistory";
import Profile from "./pages/client/Profile";

/* 🔔 Toast */
import { Toaster } from "react-hot-toast";

/* Styles */
import "./App.css";
import "./styles/Admin.css";

/* PUBLIC HOME PAGE */
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

          {/* Smooth Scroll Sections */}
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

          {/* ========================== */}
          {/* 🔐 ADMIN (Protected) */}
          {/* ========================== */}
          <Route
            path="/admin"
            element={
              <ERPProtectedRoute role="admin">
                <AdminLayout />
              </ERPProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="projects" element={<Projects />} />
            <Route path="requests" element={<RequestDemoAdmin />} />
            <Route path="contacts" element={<ContactsAdmin />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* ========================== */}
          {/* 🔐 MANAGER (Protected) */}
          {/* ========================== */}
          <Route
            path="/manager"
            element={
              <ERPProtectedRoute role="manager">
                <ManagerLayout />
              </ERPProtectedRoute>
            }
          >
            <Route index element={<ManagerDashboard />} />
            <Route path="dashboard" element={<ManagerDashboard />} />
            <Route path="projects" element={<ManageProjects />} />
            <Route path="create-client" element={<CreateClient />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<ManagerSettings />} />
          </Route>

          {/* ========================== */}
          {/* 🔐 TECHNICAL LEAD (Protected) */}
          {/* ========================== */}
          <Route
            path="/technical"
            element={
              <ERPProtectedRoute role="techlead">
                <TechnicalLayout />
              </ERPProtectedRoute>
            }
          >
            <Route index element={<TechnicalDashboard />} />
            <Route path="dashboard" element={<TechnicalDashboard />} />
            <Route path="project-updates" element={<ProjectUpdates />} />
            <Route path="team-overview" element={<TeamOverview />} />
            <Route path="profile" element={<TechnicalProfile />} />
          </Route>

          {/* ========================== */}
          {/* 🔐 CLIENT (Protected) */}
          {/* ========================== */}
          <Route
            path="/client"
            element={
              <ERPProtectedRoute role="client">
                <ClientLayout />
              </ERPProtectedRoute>
            }
          >
            <Route index element={<ClientDashboard />} />
            <Route path="dashboard" element={<ClientDashboard />} />
            <Route path="projects" element={<MyProjects />} />
            <Route path="payments" element={<Payments />} />
            <Route path="history" element={<ProjectHistory />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* 404 fallback */}
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
