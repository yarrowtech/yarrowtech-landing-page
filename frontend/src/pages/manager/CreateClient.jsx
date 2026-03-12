




// import React, { useEffect, useMemo, useState } from "react";
// import "../../styles/ManagerCreateClient.css";
// import { toast } from "react-hot-toast";
// import { Eye, EyeOff } from "lucide-react";

// import {
//   createClientAndProject,
//   getManagerProjects,
//   getTechLeads,
// } from "../../services/managerService";

// const INITIAL_DISPLAY = 15;

// export default function CreateClient() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [projects, setProjects] = useState([]);
//   const [techLeads, setTechLeads] = useState([]);

//   const [search, setSearch] = useState("");
//   const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY);

//   const [openMenu, setOpenMenu] = useState(null);

//   const [formData, setFormData] = useState({
//     projectId: "",
//     name: "",
//     clientName: "",
//     clientEmail: "",
//     password: "",
//     techLeadEmail: "",
//     expectedDelivery: "",
//   });

//   /* ================= LOAD DATA ================= */
//   useEffect(() => {
//     loadProjects();
//     loadTechLeadList();
//   }, []);

//   const loadProjects = async () => {
//     try {
//       const list = await getManagerProjects();
//       setProjects(Array.isArray(list) ? list : []);
//     } catch {
//       toast.error("Failed to load projects");
//     }
//   };

//   const loadTechLeadList = async () => {
//     try {
//       const list = await getTechLeads();
//       console.log("✅ Tech leads:", list);
//       setTechLeads(Array.isArray(list) ? list : []);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load tech leads");
//       setTechLeads([]);
//     }
//   };

//   /* ================= HELPERS ================= */
//   const getTechLeadName = (email) =>
//     techLeads.find((t) => t.email === email)?.name || email || "—";

//   const formatDate = (v) =>
//     v ? new Date(v).toLocaleDateString("en-GB") : "--";

//   /* ================= SEARCH ================= */
//   const filtered = useMemo(() => {
//     const q = search.toLowerCase();
//     return projects.filter((p) =>
//       [p.projectId, p.name, p.clientName, p.clientEmail, p.techLeadEmail]
//         .join(" ")
//         .toLowerCase()
//         .includes(q)
//     );
//   }, [projects, search]);

//   const visibleItems = filtered.slice(0, displayCount);

//   /* ================= PASSWORD ================= */
//   const generatePassword = () => {
//     const pwd =
//       Math.random().toString(36).slice(-8) +
//       Math.random().toString(36).toUpperCase().slice(-4);

//     setFormData((p) => ({ ...p, password: pwd }));
//     toast.success("Password generated");
//   };

//   /* ================= CREATE ================= */
//   const handleCreateSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.techLeadEmail) {
//       toast.error("Please select a Tech Lead");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await createClientAndProject({
//         ...formData,
//         techLeadEmail: formData.techLeadEmail.toLowerCase(),
//       });

//       if (res?.success) {
//         toast.success("Client & Project created");
//         setFormData({
//           projectId: "",
//           name: "",
//           clientName: "",
//           clientEmail: "",
//           password: "",
//           techLeadEmail: "",
//           expectedDelivery: "",
//         });
//         loadProjects();
//       } else {
//         toast.error(res?.message || "Create failed");
//       }
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Create failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= ACTION MENU ================= */
//   const toggleMenu = (id) =>
//     setOpenMenu((prev) => (prev === id ? null : id));

//   /* ================= RENDER ================= */
//   return (
//     <div className="manager-create-page">
//       {/* SEARCH */}
//       <input
//         className="search-input"
//         placeholder="Search projects..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       {/* PROJECT LIST */}
//       <div className="table-wrapper">
//         <table className="client-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Project</th>
//               <th>Client</th>
//               <th>Email</th>
//               <th>Tech Lead</th>
//               <th>Delivery</th>
//               <th className="center">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {visibleItems.map((p) => (
//               <tr key={p._id}>
//                 <td>{p.projectId}</td>
//                 <td>{p.name}</td>
//                 <td>{p.clientName}</td>
//                 <td>{p.clientEmail}</td>
//                 <td>{getTechLeadName(p.techLeadEmail)}</td>
//                 <td>{formatDate(p.expectedDelivery)}</td>

//                 <td className="center">
//                   <div className="action-dropdown">
//                     <button
//                       type="button"
//                       className="menu-btn"
//                       onClick={() => toggleMenu(p._id)}
//                     >
//                       ⋮
//                     </button>

//                     {openMenu === p._id && (
//                       <div className="menu-content show">
//                         <button onClick={() => setOpenMenu(null)}>
//                           👁 View
//                         </button>
//                         <button onClick={() => setOpenMenu(null)}>
//                           ✏ Edit
//                         </button>
//                         <button
//                           className="delete"
//                           onClick={() => setOpenMenu(null)}
//                         >
//                           🗑 Delete
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* CREATE FORM */}
//       <section className="create-form-section">
//         <div className="form-card wide">
//           <form onSubmit={handleCreateSubmit}>
//             <div className="form-grid">
//               <div className="form-group">
//                 <label>Project ID</label>
//                 <input
//                   value={formData.projectId}
//                   onChange={(e) =>
//                     setFormData((p) => ({
//                       ...p,
//                       projectId: e.target.value,
//                     }))
//                   }
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Project Name</label>
//                 <input
//                   value={formData.name}
//                   onChange={(e) =>
//                     setFormData((p) => ({
//                       ...p,
//                       name: e.target.value,
//                     }))
//                   }
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Client Name</label>
//                 <input
//                   value={formData.clientName}
//                   onChange={(e) =>
//                     setFormData((p) => ({
//                       ...p,
//                       clientName: e.target.value,
//                     }))
//                   }
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Client Email</label>
//                 <input
//                   type="email"
//                   value={formData.clientEmail}
//                   onChange={(e) =>
//                     setFormData((p) => ({
//                       ...p,
//                       clientEmail: e.target.value,
//                     }))
//                   }
//                   required
//                 />
//               </div>

//               {/* ✅ WORKING TECH LEAD DROPDOWN */}
//               <div className="form-group full">
//                 <label>Assign Tech Lead</label>
//                 <select
//                   value={formData.techLeadEmail}
//                   onChange={(e) =>
//                     setFormData((p) => ({
//                       ...p,
//                       techLeadEmail: e.target.value,
//                     }))
//                   }
//                   required
//                 >
//                   <option value="">Select Tech Lead</option>
//                   {techLeads.map((t) => (
//                     <option key={t._id || t.email} value={t.email}>
//                       {t.name || "Tech Lead"} ({t.email})
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="form-group">
//                 <label>Expected Delivery</label>
//                 <input
//                   type="date"
//                   value={formData.expectedDelivery}
//                   onChange={(e) =>
//                     setFormData((p) => ({
//                       ...p,
//                       expectedDelivery: e.target.value,
//                     }))
//                   }
//                   required
//                 />
//               </div>

//               <div className="form-group full">
//                 <label>Password</label>
//                 <div className="password-row">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     value={formData.password}
//                     onChange={(e) =>
//                       setFormData((p) => ({
//                         ...p,
//                         password: e.target.value,
//                       }))
//                     }
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? <EyeOff /> : <Eye />}
//                   </button>
//                   <button type="button" onClick={generatePassword}>
//                     Generate
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="submit-btn"
//               disabled={loading}
//             >
//               {loading ? "Creating..." : "Create Client & Project"}
//             </button>
//           </form>
//         </div>
//       </section>
//     </div>
//   );
// }







import React, { useEffect, useMemo, useState } from "react";
import "../../styles/ManagerCreateClient.css";
import { toast } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

import {
  createClientAndProject,
  getManagerProjects,
  getTechLeads,
} from "../../services/managerService";

export default function CreateClient() {
  const [projects, setProjects] = useState([]);
  const [techLeads, setTechLeads] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    projectId: "",
    name: "",
    clientName: "",
    clientEmail: "",
    password: "",
    techLeadEmail: "",
    expectedDelivery: "",
  });

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    loadProjects();
    loadTechLeads();
  }, []);

  const loadProjects = async () => {
    try {
      const list = await getManagerProjects();
      setProjects(Array.isArray(list) ? list : []);
    } catch {
      toast.error("Failed to load projects");
    }
  };

  const loadTechLeads = async () => {
    try {
      const list = await getTechLeads();
      setTechLeads(Array.isArray(list) ? list : []);
    } catch {
      toast.error("Failed to load tech leads");
    }
  };

  /* ================= FILTER ================= */
  const filteredClients = useMemo(() => {
    const q = search.toLowerCase();

    return projects.filter((p) => {
      const matchSearch =
        p.clientName?.toLowerCase().includes(q) ||
        p.clientEmail?.toLowerCase().includes(q) ||
        p.name?.toLowerCase().includes(q) ||
        p.projectId?.toLowerCase().includes(q);

      const matchStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && p.clientStatus !== "inactive") ||
        (statusFilter === "inactive" && p.clientStatus === "inactive");

      return matchSearch && matchStatus;
    });
  }, [projects, search, statusFilter]);

  /* ================= PASSWORD ================= */
  const generatePassword = () => {
    const pwd =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).toUpperCase().slice(-4);

    setFormData((p) => ({ ...p, password: pwd }));
    toast.success("Password generated");
  };

  /* ================= CREATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.techLeadEmail) {
      toast.error("Please select Tech Lead");
      return;
    }

    setLoading(true);
    try {
      await createClientAndProject(formData);
      toast.success("Client & Project created");

      setFormData({
        projectId: "",
        name: "",
        clientName: "",
        clientEmail: "",
        password: "",
        techLeadEmail: "",
        expectedDelivery: "",
      });

      loadProjects();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Create failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="manager-create-page">
      {/* ================= FILTER BAR ================= */}
      <div className="admin-filters">
        <input
          className="search-input"
          placeholder="Search client / email / project..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* ================= CLIENT LIST CARD ================= */}
      <div className="client-card-grid">
        {filteredClients.map((p) => (
          <div key={p._id} className="client-card">
            <h4>{p.clientName}</h4>
            <p>{p.clientEmail}</p>

            <span className={`status-badge ${p.clientStatus || "active"}`}>
              {p.clientStatus || "active"}
            </span>

            <div className="card-meta">
              <div>
                <strong>Project:</strong> {p.name}
              </div>
              <div>
                <strong>ID:</strong> {p.projectId}
              </div>
            </div>

            <div className="card-actions">
              <button className="reset-btn">Reset Password</button>
              <button className="toggle-btn">
                {p.clientStatus === "inactive" ? "Activate" : "Deactivate"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= CREATE FORM ================= */}
      <section className="create-form-section">
        <div className="form-card">
          <h3>Create Client</h3>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <input
                placeholder="Project ID"
                value={formData.projectId}
                onChange={(e) =>
                  setFormData({ ...formData, projectId: e.target.value })
                }
                required
              />

              <input
                placeholder="Project Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />

              <input
                placeholder="Client Name"
                value={formData.clientName}
                onChange={(e) =>
                  setFormData({ ...formData, clientName: e.target.value })
                }
                required
              />

              <input
                type="email"
                placeholder="Client Email"
                value={formData.clientEmail}
                onChange={(e) =>
                  setFormData({ ...formData, clientEmail: e.target.value })
                }
                required
              />

              <select
                value={formData.techLeadEmail}
                onChange={(e) =>
                  setFormData({ ...formData, techLeadEmail: e.target.value })
                }
                required
              >
                <option value="">Select Tech Lead</option>
                {techLeads.map((t) => (
                  <option key={t.email} value={t.email}>
                    {t.name || "Tech Lead"} ({t.email})
                  </option>
                ))}
              </select>

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

              <div className="password-row">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
                <button type="button" onClick={generatePassword}>
                  Generate
                </button>
              </div>
            </div>

            <button className="submit-btn" disabled={loading}>
              {loading ? "Creating..." : "Create Client"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
