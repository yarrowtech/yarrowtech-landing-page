


// import React, { useEffect, useMemo, useState } from "react";
// import "../../styles/ManagerCreateClient.css";
// import { toast } from "react-hot-toast";
// import { Eye, EyeOff } from "lucide-react";
// import {
//   createClientAndProject,
//   getManagerProjects,
//   getTechLeads,
//   updateManagerProject,
//   deleteManagerProject,
// } from "../../services/managerService";

// const INITIAL_DISPLAY = 15;
// const LOAD_MORE_COUNT = 10;

// export default function CreateClient() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [projects, setProjects] = useState([]);
//   const [techLeads, setTechLeads] = useState([]);

//   const [search, setSearch] = useState("");
//   const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY);
//   const [isLoadingMore, setIsLoadingMore] = useState(false);

//   const [openMenu, setOpenMenu] = useState(null);
//   const [selectedProject, setSelectedProject] = useState(null);

//   const [formData, setFormData] = useState({
//     projectId: "",
//     name: "",               // ✅ backend-aligned
//     clientName: "",
//     clientEmail: "",
//     password: "",
//     techLeadEmail: "",
//     expectedDelivery: "",
//   });

//   const toggleMenu = (projectId) => {
//     setOpenMenu((prev) => (prev === projectId ? null : projectId));
//   };

//   useEffect(() => {
//     const handleOutsideClick = () => {
//       setOpenMenu(null);
//     };

//     window.addEventListener("click", handleOutsideClick);
//     return () => window.removeEventListener("click", handleOutsideClick);
//   }, []);





//   /* ================= LOAD DATA ================= */
//   useEffect(() => {
//     loadProjects();
//     loadTechLeadList();
//   }, []);

//   const loadProjects = async () => {
//     try {
//       const list = await getManagerProjects();
//       setProjects(list || []);
//     } catch {
//       toast.error("Failed to load projects");
//     }
//   };
// const loadTechLeadList = async () => {
//   try {
//     console.log("➡️ loading tech leads...");
//     const list = await getTechLeads();
//     console.log("✅ tech leads list:", list);
//     setTechLeads(Array.isArray(list) ? list : []);
//   } catch (err) {
//     console.log("❌ getTechLeads failed:", err);
//     toast.error(
//       err?.response?.data?.message || err?.message || "Failed to load tech leads"
//     );
//     setTechLeads([]);
//   }
// };





//   /* ================= HELPERS ================= */
//   const getTechLeadName = (email) =>
//     techLeads.find((t) => t.email === email)?.name || email;

//   const formatDate = (v) =>
//     v ? new Date(v).toLocaleDateString("en-GB") : "--";

//   /* ================= CREATE ================= */
//   const handleCreateSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await createClientAndProject({
//         ...formData,
//         techLeadEmail: formData.techLeadEmail.trim().toLowerCase(),
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
//         toast.error(res?.message || "Failed");
//       }
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Failed");
//     } finally {
//       setLoading(false);
//     }
//   };

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
//               <tr key={p._id} className="row-hover">
//                 <td>{p.projectId}</td>
//                 <td>{p.name}</td>
//                 <td>{p.clientName}</td>
//                 <td>{p.clientEmail}</td>
//                 <td>{getTechLeadName(p.techLeadEmail)}</td>
//                 <td>{formatDate(p.expectedDelivery)}</td>

//                 {/* ✅ DROPDOWN ACTION BUTTON */}
//                 <td className="center">
//                   <div
//                     className="action-dropdown"
//                     onClick={(e) => e.stopPropagation()}
//                   >
//                     <button
//                       type="button"
//                       className="menu-btn"
//                       onClick={() => toggleMenu(p._id)}
//                     >
//                       ⋮
//                     </button>

//                     {openMenu === p._id && (
//                       <div className="menu-content show">
//                         <button
//                           onClick={() => {
//                             console.log("View", p);
//                             setOpenMenu(null);
//                           }}
//                         >
//                           👁 View
//                         </button>

//                         <button
//                           onClick={() => {
//                             console.log("Edit", p);
//                             setOpenMenu(null);
//                           }}
//                         >
//                           ✏ Edit
//                         </button>
//                         <button
//                           className="delete"
//                           onClick={() => {
//                             console.log("Delete", p);
//                             setOpenMenu(null);
//                           }}
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
//       <section
//         className="create-form-section"
//         onClick={(e) => e.stopPropagation()}
//       >

//         <div className="form-card wide">
//           <form onSubmit={handleCreateSubmit}>
//             <div className="form-grid">

//               <div className="form-group">
//                 <label>Project ID</label>
//                 <input
//                   value={formData.projectId}
//                   onChange={(e) =>
//                     setFormData((p) => ({ ...p, projectId: e.target.value }))
//                   }
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Project Name</label>
//                 <input
//                   value={formData.name}
//                   onChange={(e) =>
//                     setFormData((p) => ({ ...p, name: e.target.value }))
//                   }
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Client Name</label>
//                 <input
//                   value={formData.clientName}
//                   onChange={(e) =>
//                     setFormData((p) => ({ ...p, clientName: e.target.value }))
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
//                     setFormData((p) => ({ ...p, clientEmail: e.target.value }))
//                   }
//                   required
//                 />
//               </div>

//               {/* ✅ FIXED TECH LEAD DROPDOWN */}
//               <div className="form-group full">
//                 <label>Assign Tech Lead</label>
//                 <select
//                 id="techLead"
//                 name="techLead"
//                   value={formData.techLeadEmail}
//                   onChange={(e) => {
//                     e.stopPropagation(); // ⬅ VERY IMPORTANT
//                     setFormData((p) => ({
//                       ...p,
//                       techLeadEmail: e.target.value,
//                     }));
//                   }}
//                   onClick={(e) => e.stopPropagation()}   // ⬅ prevents window click close
//                   required
//                 >

//                   <option value="">Select Tech Lead</option>
//                   {techLeads.map((t, idx) => (
//   <option key={t.email || idx} value={t.email || ""}>
//     {t.name || "Tech Lead"} {t.email ? `(${t.email})` : ""}
//   </option>
// ))}

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
//                       setFormData((p) => ({ ...p, password: e.target.value }))
//                     }
//                     required
//                   />
//                   <button type="button" onClick={() => setShowPassword(!showPassword)}>
//                     {showPassword ? <EyeOff /> : <Eye />}
//                   </button>
//                   <button type="button" onClick={generatePassword}>
//                     Generate
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <button type="submit" className="submit-btn" disabled={loading}>
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

const INITIAL_DISPLAY = 15;

export default function CreateClient() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [projects, setProjects] = useState([]);
  const [techLeads, setTechLeads] = useState([]);

  const [search, setSearch] = useState("");
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY);

  const [openMenu, setOpenMenu] = useState(null);

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
    loadTechLeadList();
  }, []);

  const loadProjects = async () => {
    try {
      const list = await getManagerProjects();
      setProjects(Array.isArray(list) ? list : []);
    } catch {
      toast.error("Failed to load projects");
    }
  };

  const loadTechLeadList = async () => {
    try {
      const list = await getTechLeads();
      console.log("✅ Tech leads:", list);
      setTechLeads(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load tech leads");
      setTechLeads([]);
    }
  };

  /* ================= HELPERS ================= */
  const getTechLeadName = (email) =>
    techLeads.find((t) => t.email === email)?.name || email || "—";

  const formatDate = (v) =>
    v ? new Date(v).toLocaleDateString("en-GB") : "--";

  /* ================= SEARCH ================= */
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return projects.filter((p) =>
      [p.projectId, p.name, p.clientName, p.clientEmail, p.techLeadEmail]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [projects, search]);

  const visibleItems = filtered.slice(0, displayCount);

  /* ================= PASSWORD ================= */
  const generatePassword = () => {
    const pwd =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).toUpperCase().slice(-4);

    setFormData((p) => ({ ...p, password: pwd }));
    toast.success("Password generated");
  };

  /* ================= CREATE ================= */
  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    if (!formData.techLeadEmail) {
      toast.error("Please select a Tech Lead");
      return;
    }

    setLoading(true);
    try {
      const res = await createClientAndProject({
        ...formData,
        techLeadEmail: formData.techLeadEmail.toLowerCase(),
      });

      if (res?.success) {
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
      } else {
        toast.error(res?.message || "Create failed");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Create failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= ACTION MENU ================= */
  const toggleMenu = (id) =>
    setOpenMenu((prev) => (prev === id ? null : id));

  /* ================= RENDER ================= */
  return (
    <div className="manager-create-page">
      {/* SEARCH */}
      <input
        className="search-input"
        placeholder="Search projects..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* PROJECT LIST */}
      <div className="table-wrapper">
        <table className="client-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Project</th>
              <th>Client</th>
              <th>Email</th>
              <th>Tech Lead</th>
              <th>Delivery</th>
              <th className="center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {visibleItems.map((p) => (
              <tr key={p._id}>
                <td>{p.projectId}</td>
                <td>{p.name}</td>
                <td>{p.clientName}</td>
                <td>{p.clientEmail}</td>
                <td>{getTechLeadName(p.techLeadEmail)}</td>
                <td>{formatDate(p.expectedDelivery)}</td>

                <td className="center">
                  <div className="action-dropdown">
                    <button
                      type="button"
                      className="menu-btn"
                      onClick={() => toggleMenu(p._id)}
                    >
                      ⋮
                    </button>

                    {openMenu === p._id && (
                      <div className="menu-content show">
                        <button onClick={() => setOpenMenu(null)}>
                          👁 View
                        </button>
                        <button onClick={() => setOpenMenu(null)}>
                          ✏ Edit
                        </button>
                        <button
                          className="delete"
                          onClick={() => setOpenMenu(null)}
                        >
                          🗑 Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CREATE FORM */}
      <section className="create-form-section">
        <div className="form-card wide">
          <form onSubmit={handleCreateSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Project ID</label>
                <input
                  value={formData.projectId}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      projectId: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Project Name</label>
                <input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      name: e.target.value,
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
                    setFormData((p) => ({
                      ...p,
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
                    setFormData((p) => ({
                      ...p,
                      clientEmail: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              {/* ✅ WORKING TECH LEAD DROPDOWN */}
              <div className="form-group full">
                <label>Assign Tech Lead</label>
                <select
                  value={formData.techLeadEmail}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      techLeadEmail: e.target.value,
                    }))
                  }
                  required
                >
                  <option value="">Select Tech Lead</option>
                  {techLeads.map((t) => (
                    <option key={t._id || t.email} value={t.email}>
                      {t.name || "Tech Lead"} ({t.email})
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
                    setFormData((p) => ({
                      ...p,
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
                      setFormData((p) => ({
                        ...p,
                        password: e.target.value,
                      }))
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
    </div>
  );
}
