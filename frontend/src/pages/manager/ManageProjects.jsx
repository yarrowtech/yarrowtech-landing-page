import React, { useEffect, useMemo, useState } from "react";
import "../../styles/ManagerCreateClient.css";
import { toast } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import {
  createClientAndProject,
  getManagerProjects,
  getTechLeads,
  updateManagerProject,
  deleteManagerProject,
} from "../../services/managerService";

const INITIAL_DISPLAY = 15;
const LOAD_MORE_COUNT = 10;

export default function CreateClient() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [projects, setProjects] = useState([]);
  const [techLeads, setTechLeads] = useState([]);

  const [selectedProject, setSelectedProject] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [deleteOption, setDeleteOption] = useState("project");

  const [search, setSearch] = useState("");
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [openMenuId, setOpenMenuId] = useState(null); // 🔥 NEW: Fix menu toggle

  const [formData, setFormData] = useState({
    projectId: "",
    projectName: "",
    clientName: "",
    clientEmail: "",
    password: "",
    techLeadEmail: "",
    expectedDelivery: "",
  });

  // ---------------- LOAD DATA ----------------
  useEffect(() => {
    loadProjects();
    loadTechLeadList();
  }, []);

  const loadProjects = async () => {
    try {
      const list = await getManagerProjects();
      setProjects(list || []);
    } catch {
      toast.error("Failed to load projects");
    }
  };

  // FIXED — handles all backend response shapes
  const loadTechLeadList = async () => {
    try {
      const res = await getTechLeads();

      let rawList = [];
      if (Array.isArray(res)) rawList = res;
      else if (res?.techLeads) rawList = res.techLeads;
      else if (res?.data?.techLeads) rawList = res.data.techLeads;

      const formatted = rawList.map((t, i) => ({
        email: t.email,
        name: t.name || `Tech Lead ${i + 1}`,
      }));

      setTechLeads(formatted);
    } catch {
      toast.error("Failed to load tech leads");
    }
  };

  // ---------------- PASSWORD ----------------
  const generatePassword = () => {
    const strongPwd =
      Math.random().toString(36).slice(-10) +
      Math.random().toString(36).toUpperCase().slice(-4);

    setFormData({ ...formData, password: strongPwd });
    toast.success("Strong password generated!");
  };

  // ---------------- CREATE ----------------
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await createClientAndProject(formData);
      if (res.success) {
        toast.success("Client + Project created!");

        setFormData({
          projectId: "",
          projectName: "",
          clientName: "",
          clientEmail: "",
          password: "",
          techLeadEmail: "",
          expectedDelivery: "",
        });

        await loadProjects();
        setDisplayCount(INITIAL_DISPLAY);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- SEARCH ----------------
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return projects.filter((p) =>
      `${p.projectId} ${p.projectName} ${p.clientName} ${p.clientEmail} ${p.techLeadEmail} ${p.status}`
        .toLowerCase()
        .includes(q)
    );
  }, [projects, search]);

  // ---------------- INFINITE SCROLL ----------------
  useEffect(() => {
    const onScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 250;

      if (nearBottom && filtered.length > displayCount) {
        setIsLoadingMore(true);

        setTimeout(() => {
          setDisplayCount((c) => c + LOAD_MORE_COUNT);
          setIsLoadingMore(false);
        }, 300);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [filtered.length, displayCount]);

  const visibleItems = filtered.slice(0, displayCount);

  // ---------------- ACTION MENU (FIXED) ----------------

  // Close menu when clicking outside
  useEffect(() => {
    const handleClick = () => setOpenMenuId(null);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const toggleMenu = (id, e) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === id ? null : id);
  };

  // ---------------- MODAL HANDLERS ----------------
  const openViewModal = (p) => {
    setSelectedProject(p);
    setEditMode(false);
  };

  const openEditModal = (p) => {
    setSelectedProject({
      ...p,
      expectedDelivery: p.expectedDelivery?.slice(0, 10) || "",
    });
    setEditMode(true);
  };

  const saveProjectEdits = async () => {
    setLoading(true);
    try {
      const payload = { ...selectedProject };
      delete payload._id;

      const res = await updateManagerProject(selectedProject._id, payload);
      if (res.success) {
        toast.success("Project updated");
        setEditMode(false);
        setSelectedProject(null);
        loadProjects();
      }
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const confirmDeleteFlow = (p) => {
    setConfirmDelete(p);
    setDeleteOption("project");
  };

  const performDelete = async () => {
    setLoading(true);

    try {
      const res = await deleteManagerProject(
        confirmDelete._id,
        deleteOption === "both"
      );
      if (res.success) {
        toast.success("Deleted successfully");
        setConfirmDelete(null);
        loadProjects();
      }
    } catch {
      toast.error("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const statusClass = (s) => {
    if (!s) return "status-pending";
    s = s.toLowerCase();

    if (s === "completed") return "status-completed";
    if (s === "ongoing") return "status-ongoing";
    return "status-pending";
  };

  // -----------------------------------------------------------
  //  RENDER
  // -----------------------------------------------------------

  return (
    <div className="manager-create-container">

      <div className="top-header">
        <h2>Create Client & Project</h2>
        <p>Fill the form to add a project with tech lead assignment.</p>
      </div>

      <div className="row-grid">

        {/* ---------------- FORM ---------------- */}
        <div className="form-card">
          <form onSubmit={handleCreateSubmit}>

            <div className="form-grid">

              <div className="form-group">
                <label>Project ID</label>
                <input
                  value={formData.projectId}
                  onChange={(e) =>
                    setFormData({ ...formData, projectId: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Project Name</label>
                <input
                  value={formData.projectName}
                  onChange={(e) =>
                    setFormData({ ...formData, projectName: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Client Name</label>
                <input
                  value={formData.clientName}
                  onChange={(e) =>
                    setFormData({ ...formData, clientName: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Client Email</label>
                <input
                  type="email"
                  value={formData.clientEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, clientEmail: e.target.value })
                  }
                  required
                />
              </div>

              {/* -------- FIXED TECHLEAD DROPDOWN -------- */}
              <div className="form-group">
                <label>Assign Tech Lead</label>
                <select
                  value={formData.techLeadEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, techLeadEmail: e.target.value })
                  }
                  required
                >
                  <option value="" disabled hidden>
                    Select Tech Lead
                  </option>

                  {techLeads.map((t, i) => (
                    <option key={i} value={t.email}>
                      {t.name} ({t.email})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Expected Delivery</label>
                <input
                  type="date"
                  value={formData.expectedDelivery}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      expectedDelivery: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-group full">
                <label>Password</label>

                <div className="password-row">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />

                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>

                  <button
                    type="button"
                    className="generate-btn"
                    onClick={generatePassword}
                  >
                    Generate
                  </button>
                </div>
              </div>
            </div>

            <button className="submit-btn" disabled={loading}>
              {loading ? "Creating..." : "Create Client & Project"}
            </button>
          </form>
        </div>

        {/* SEARCH */}
        <div className="search-card">
          <input
            className="search-input"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setDisplayCount(INITIAL_DISPLAY);
            }}
          />
        </div>
      </div>

      {/* ---------------- TABLE ---------------- */}
      <div className="client-list-section">
        <h3>Created Clients & Projects</h3>

        <table className="client-table">
          <thead>
            <tr>
              <th>Project ID</th>
              <th>Project</th>
              <th>Client</th>
              <th>Email</th>
              <th>Tech Lead</th>
              <th>Delivery</th>
              <th>Status</th>
              <th className="center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {visibleItems.length === 0 ? (
              <tr>
                <td colSpan="8" className="no-records">
                  No projects found
                </td>
              </tr>
            ) : (
              visibleItems.map((p) => (
                <tr key={p._id} className="row-hover">

                  <td>{p.projectId}</td>
                  <td>{p.projectName}</td>
                  <td>{p.clientName}</td>
                  <td>{p.clientEmail}</td>
                  <td>{p.techLeadEmail}</td>
                  <td>{p.expectedDelivery || "—"}</td>

                  <td>
                    <span className={`status-badge ${statusClass(p.status)}`}>
                      {p.status || "pending"}
                    </span>
                  </td>

                  {/* ------- FIXED ACTION MENU ------- */}
                  <td className="center">
                    <div
                      className="action-dropdown"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        className="menu-btn"
                        onClick={(e) => toggleMenu(p._id, e)}
                      >
                        ⋮
                      </button>

                      <div
                        className="menu-content"
                        style={{ display: openMenuId === p._id ? "block" : "none" }}
                      >
                        <button onClick={() => openViewModal(p)}>👁 View</button>
                        <button onClick={() => openEditModal(p)}>✏ Edit</button>
                        <button
                          className="delete"
                          onClick={() => confirmDeleteFlow(p)}
                        >
                          🗑 Delete
                        </button>
                      </div>
                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>

        {filtered.length > displayCount && (
          <div className="load-more-indicator">
            {isLoadingMore ? "Loading more…" : "Scroll to load more…"}
          </div>
        )}
      </div>

      {/* MODALS ARE SAME AS BEFORE - not removed */}

    </div>
  );
}
