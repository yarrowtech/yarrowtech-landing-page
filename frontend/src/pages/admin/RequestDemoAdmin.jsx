import React, { useEffect, useState } from "react";
import "../../styles/RequestDemoAdmin.css";
import { getDemoRequests } from "../../services/adminService";
import {
  Search,
  User,
  Mail,
  Building2,
  MessageCircle,
  CalendarDays,
} from "lucide-react";

export default function RequestDemoAdmin() {
  const [requests, setRequests] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const data = await getDemoRequests();

      console.log("DEMO REQUEST RESPONSE:", data);

      // Backend returns -> { success, count, requests }
      const list = Array.isArray(data?.requests) ? data.requests : [];

      setRequests(list);
      setFiltered(list);
    } catch (err) {
      console.error("❌ Failed to load demo requests:", err);
      setRequests([]);
      setFiltered([]);
    } finally {
      setLoading(false);
    }
  };

  // Search filtering
  useEffect(() => {
    if (!search.trim()) return setFiltered(requests);

    const s = search.toLowerCase();

    const result = requests.filter(
      (r) =>
        r.name?.toLowerCase().includes(s) ||
        r.email?.toLowerCase().includes(s) ||
        r.company?.toLowerCase().includes(s) ||
        r.message?.toLowerCase().includes(s)
    );

    setFiltered(result);
  }, [search, requests]);

  return (
    <div className="admin-requests-container">

      {/* HEADER */}
      <div className="admin-header">
        <h2>Demo Requests</h2>
        <p className="subtitle">View and manage demo inquiries submitted from the website.</p>
      </div>

      {/* SEARCH BAR */}
      <div className="rd-search-bar">
        <div className="rd-search-box">
          <Search size={18} className="icon" />
          <input
            type="text"
            placeholder="Search by name, email, company or message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="rd-count-chip">
          Total: {filtered.length}
        </div>
      </div>

      {/* TABLE */}
      {loading ? (
        <div className="rd-skeleton-wrapper">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rd-skeleton-row"></div>
          ))}
        </div>
      ) : (
        <div className="rd-table-wrapper">
          <table className="rd-table">
            <thead>
              <tr>
                <th><User size={16}/> Name</th>
                <th><Mail size={16}/> Email</th>
                <th><Building2 size={16}/> Company</th>
                <th><MessageCircle size={16}/> Message</th>
                <th><CalendarDays size={16}/> Date</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="5" className="rd-no-records">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                      className="rd-no-data-img"
                      alt="No data"
                    />
                    <p>No demo requests found</p>
                  </td>
                </tr>
              ) : (
                filtered.map((req) => (
                  <tr key={req._id}>
                    <td>{req.name}</td>
                    <td>{req.email}</td>
                    <td>{req.company || "—"}</td>
                    <td className="rd-msg-cell">{req.message || "—"}</td>
                    <td>{new Date(req.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}
