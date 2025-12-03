import API from "./axiosInstance";

// ===============================
// ADMIN DASHBOARD STATS  ✅ FIXED
// ===============================
export const getAdminStats = async () => {
  const res = await API.get("/erp/admin/stats");
  return res.data;
};

// ===============================
// All Projects (Admin Monitor)
// ===============================
export const getAllProjects = async () => {
  const res = await API.get("/erp/projects");
  return res.data;
};
// ===============================
// All ERP Users (Admin Only)
// ===============================
export const getERPUsers = async () => {
  const res = await API.get("/erp/admin/users");

  console.log("USERS RESPONSE:", res.data); // Debug

  return res.data.users || []; // MUST return an array
};

// ===============================
// Contact Form Submissions
// ===============================
export const getContacts = async () => {
  const res = await API.get("/contact/all");
  return res.data;
};


// ===============================
// Demo Requests
// ===============================
export const getDemoRequests = async () => {
  const res = await API.get("/forms/demo");
  return res.data;
};

// ===============================
// Update Admin Profile
// ===============================
export const updateAdminProfile = async (payload) => {
  const res = await API.put("/erp/admin/profile", payload);
  return res.data;
};


// Update Project (Admin Inline Edit)
// ===============================
export const updateProject = async (projectId, payload) => {
  const res = await API.put(`/erp/projects/${projectId}`, payload);
  return res.data;
};
