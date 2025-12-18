
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

  // data
  const [projects, setProjects] = useState([]);
  const [techLeads, setTechLeads] = useState([]);

  // search + infinite scroll
  const [search, setSearch] = useState("");
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // dropdown menu (per row)
  const [openMenu, setOpenMenu] = useState(null);

  // modals
  const [selectedProject, setSelectedProject] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [deleteOption, setDeleteOption] = useState("project");

  // create form
  const [formData, setFormData] = useState({
    projectId: "",
    projectName: "",
    clientName: "",
    clientEmail: "",
    password: "",
    techLeadEmail: "",
    expectedDelivery: "",
  });

  /* ============================================
     LOAD PROJECTS + TECH LEADS
  ============================================ */
  useEffect(() => {
    loadProjects();
    loadTechLeadList();
  }, []);

  const loadProjects = async () => {
  try {
    const list = await getManagerProjects();

    console.log("📌 PROJECTS FROM API (FULL):", JSON.stringify(list, null, 2));

    setProjects(list || []);
  } catch {
    toast.error("Failed to load projects");
  }
};


  const loadTechLeadList = async () => {
    try {
      // getTechLeads() should return array like:
      // [{ email: "...", name: "Tech Lead 1" }, ...]
      const list = await getTechLeads();

      const formatted = (list || []).map((t, i) => ({
        email: t.email,
        name: t.name || `Tech Lead ${i + 1}`,
      }));

      setTechLeads(formatted);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load tech leads");
    }
  };

  /* ============================================
     PASSWORD GENERATOR
  ============================================ */
  const generatePassword = () => {
    const pwd =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).toUpperCase().slice(-4);

    setFormData((prev) => ({ ...prev, password: pwd }));
    toast.success("Strong password generated!");
  };

  /* ============================================
     CREATE CLIENT + PROJECT
  ============================================ */
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await createClientAndProject(formData);

      if (res?.success) {
        toast.success("Client & Project created!");

        setFormData({
          projectId: "",
          projectName: "",
          clientName: "",
          clientEmail: "",
          password: "",
          techLeadEmail: "",
          expectedDelivery: "",
        });

        setDisplayCount(INITIAL_DISPLAY);
        await loadProjects();
      } else {
        toast.error(res?.message || "Failed to create");
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to create");
    } finally {
      setLoading(false);
    }
  };

  /* ============================================
     SEARCH + FILTER
  ============================================ */
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return projects;

    return projects.filter((p) =>
      [
        p.projectId,
        p.projectName,
        p.clientName,
        p.clientEmail,
        p.techLeadEmail,
        p.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [projects, search]);

  /* ============================================
     INFINITE SCROLL
  ============================================ */
  useEffect(() => {
    const onScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 260;

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

  /* ============================================
     DROPDOWN MENU BEHAVIOUR
  ============================================ */
  const toggleMenu = (projectId) => {
    setOpenMenu((prev) => (prev === projectId ? null : projectId));
  };

  // close menu on outside click
  useEffect(() => {
    const handleClick = () => setOpenMenu(null);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  /* ============================================
     MODALS: VIEW / EDIT
  ============================================ */
  const openViewModal = (project) => {
    setSelectedProject(project);
    setViewModal(true);
    setOpenMenu(null);
  };

  const openEditModal = (project) => {
    setSelectedProject({
      ...project,
      expectedDelivery: project.expectedDelivery
        ? project.expectedDelivery.slice(0, 10)
        : "",
    });
    setEditModal(true);
    setOpenMenu(null);
  };

  const handleEditChange = (field, value) => {
    setSelectedProject((prev) => ({ ...prev, [field]: value }));
  };

  const saveProjectEdits = async () => {
    if (!selectedProject?._id) return;

    setLoading(true);
    try {
      const payload = { ...selectedProject };
      delete payload._id; // backend uses URL id

      const res = await updateManagerProject(selectedProject._id, payload);

      if (res?.success) {
        toast.success("Project updated");
        setEditModal(false);
        setSelectedProject(null);
        await loadProjects();
      } else {
        toast.error(res?.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to update");
    } finally {
      setLoading(false);
    }
  };

  /* ============================================
     DELETE FLOW
  ============================================ */
  const startDeleteFlow = (project) => {
    setConfirmDelete(project);
    setDeleteOption("project");
    setOpenMenu(null);
  };

  const performDelete = async () => {
    if (!confirmDelete?._id) return;

    setLoading(true);
    try {
      const deleteClient = deleteOption === "both";
      const res = await deleteManagerProject(confirmDelete._id, deleteClient);

      if (res?.success) {
        toast.success(res?.message || "Deleted successfully");
        setConfirmDelete(null);
        await loadProjects();
      } else {
        toast.error(res?.message || "Delete failed");
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to delete");
    } finally {
      setLoading(false);
    }
  };

  /* ============================================
     HELPERS
  ============================================ */
  const formatDate = (value) => {
    if (!value) return "--";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value; // already formatted
    return d.toLocaleDateString("en-GB"); // dd/mm/yyyy
  };

  const statusClass = (status) => {
    const s = (status || "new").toLowerCase();
    if (s.includes("complete")) return "status-completed";
    if (s.includes("ongoing")) return "status-ongoing";
    return "status-pending";
  };

  /* ============================================
     RENDER
  ============================================ */
  return (
    <div className="manager-create-page">
      {/* PAGE HEADER */}
      <header className="page-header">
        <div>
          <h1>Create Client & Project</h1>
          <p>Search existing projects or create a new client + project.</p>
        </div>
      </header>

      {/* TOP SEARCH BAR */}
      <section className="search-row-wrapper">
        <div className="search-card full-width">
          <input
            className="search-input"
            placeholder="Search by project, client, email, tech lead..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setDisplayCount(INITIAL_DISPLAY);
            }}
          />
        </div>
      </section>

      {/* LIST SECTION */}
      <section className="client-list-section">
        <div className="section-header">
          <h2>Created Clients & Projects</h2>
          <span className="section-sub">
            Showing {visibleItems.length} of {filtered.length} projects
          </span>
        </div>

        <div className="table-wrapper">
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
                    <td>{p.name || "—"}</td>
                    <td>{p.clientName}</td>
                    <td>{p.clientEmail}</td>
                    <td>{p.techLeadEmail}</td>
                    <td>{formatDate(p.expectedDelivery)}</td>
                    <td>
                      <span className={`status-badge ${statusClass(p.status)}`}>
                        {p.status || "New"}
                      </span>
                    </td>

                    <td className="center">
                      <div
                        className="action-dropdown"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          className="menu-btn"
                          onClick={() => toggleMenu(p._id)}
                        >
                          ⋮
                        </button>

                        {openMenu === p._id && (
                          <div
                            className="menu-content show"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              type="button"
                              onClick={() => openViewModal(p)}
                            >
                              👁 View
                            </button>
                            <button
                              type="button"
                              onClick={() => openEditModal(p)}
                            >
                              ✏ Edit
                            </button>
                            <button
                              type="button"
                              className="delete"
                              onClick={() => startDeleteFlow(p)}
                            >
                              🗑 Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {filtered.length > displayCount && (
          <div className="load-more-indicator">
            {isLoadingMore ? "Loading more..." : "Scroll to load more..."}
          </div>
        )}
      </section>

      {/* FORM SECTION */}
      <section className="create-form-section">
        <div className="section-header">
          <h2>Create New Client & Project</h2>
          <span className="section-sub">
            Fill the details below to onboard a new client and assign a tech
            lead.
          </span>
        </div>
        <div className="form-card wide">
          <form onSubmit={handleCreateSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Project ID</label>
                <input
                  value={formData.projectId}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      projectId: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Project Name</label>
                <input
                  value={formData.projectName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      projectName: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Client Name</label>
                <input
                  value={formData.clientName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      clientName: e.target.value,
                    }))
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
                    setFormData((prev) => ({
                      ...prev,
                      clientEmail: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Assign Tech Lead</label>
                <select
                  value={formData.techLeadEmail}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      techLeadEmail: e.target.value,
                    }))
                  }
                  required
                >
                  <option value="" disabled>
                    -- Select Tech Lead --
                  </option>
                  {techLeads.map((t) => (
                    <option key={t.email} value={t.email}>
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
                    setFormData((prev) => ({
                      ...prev,
                      expectedDelivery: e.target.value,
                    }))
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
                      setFormData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => setShowPassword((v) => !v)}
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

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Client & Project"}
            </button>
          </form>
        </div>
      </section>

      {/* VIEW MODAL */}
      {viewModal && selectedProject && (
        <div
          className="modal-backdrop"
          onClick={() => setViewModal(false)}
        >
          <div
            className="modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Project Details</h2>
            <p>
              <strong>Project ID:</strong> {selectedProject.projectId}
            </p>
            <p>
              <strong>Project Name:</strong>{" "}
              {selectedProject.projectName || "—"}
            </p>
            <p>
              <strong>Client Name:</strong> {selectedProject.clientName}
            </p>
            <p>
              <strong>Email:</strong> {selectedProject.clientEmail}
            </p>
            <p>
              <strong>Tech Lead:</strong> {selectedProject.techLeadEmail}
            </p>
            <p>
              <strong>Delivery:</strong>{" "}
              {formatDate(selectedProject.expectedDelivery)}
            </p>
            <p>
              <strong>Status:</strong> {selectedProject.status || "New"}
            </p>

            <button
              className="submit-btn"
              style={{ marginTop: 18 }}
              onClick={() => setViewModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editModal && selectedProject && (
        <div
          className="modal-backdrop"
          onClick={() => setEditModal(false)}
        >
          <div
            className="modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Edit Project</h2>

            <label>Project Name</label>
            <input
              value={selectedProject.projectName || ""}
              onChange={(e) =>
                handleEditChange("projectName", e.target.value)
              }
            />

            <label style={{ marginTop: 10 }}>Tech Lead</label>
            <select
              value={selectedProject.techLeadEmail || ""}
              onChange={(e) =>
                handleEditChange("techLeadEmail", e.target.value)
              }
            >
              <option value="">-- Select Tech Lead --</option>
              {techLeads.map((t) => (
                <option key={t.email} value={t.email}>
                  {t.name} ({t.email})
                </option>
              ))}
            </select>

            <label style={{ marginTop: 10 }}>Expected Delivery</label>
            <input
              type="date"
              value={selectedProject.expectedDelivery || ""}
              onChange={(e) =>
                handleEditChange("expectedDelivery", e.target.value)
              }
            />

            <label style={{ marginTop: 10 }}>Status</label>
            <select
              value={selectedProject.status || "pending"}
              onChange={(e) =>
                handleEditChange("status", e.target.value)
              }
            >
              <option value="new">New</option>
              <option value="pending">Pending</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>

            <div
              style={{
                marginTop: 16,
                display: "flex",
                gap: 8,
                justifyContent: "flex-end",
              }}
            >
              <button
                type="button"
                className="generate-btn"
                onClick={saveProjectEdits}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save changes"}
              </button>
              <button
                type="button"
                className="icon-btn"
                onClick={() => setEditModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM MODAL */}
      {confirmDelete && (
        <div
          className="modal-backdrop"
          onClick={() => setConfirmDelete(null)}
        >
          <div
            className="modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Delete Project</h2>
            <p style={{ marginBottom: 12 }}>
              Are you sure you want to delete{" "}
              <strong>{confirmDelete.projectName}</strong>?
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label>
                <input
                  type="radio"
                  name="delopt"
                  value="project"
                  checked={deleteOption === "project"}
                  onChange={() => setDeleteOption("project")}
                />{" "}
                Delete project only
              </label>
              <label>
                <input
                  type="radio"
                  name="delopt"
                  value="both"
                  checked={deleteOption === "both"}
                  onChange={() => setDeleteOption("both")}
                />{" "}
                Delete project and client account
              </label>
            </div>

            <div
              style={{
                marginTop: 16,
                display: "flex",
                gap: 8,
                justifyContent: "flex-end",
              }}
            >
              <button
                type="button"
                className="generate-btn"
                style={{ background: "#ef4444", color: "#fff" }}
                onClick={performDelete}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Confirm delete"}
              </button>
              <button
                type="button"
                className="icon-btn"
                onClick={() => setConfirmDelete(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
