import API from "./axiosInstance";

/* ===============================
   ADMIN DASHBOARD STATS
================================ */
export const getAdminStats = async () => {
  const res = await API.get("/erp/admin/stats");
  return res.data;
};

/* ===============================
   ALL PROJECTS (ADMIN)
================================ */
export const getAllProjects = async () => {
  const res = await API.get("/erp/projects");
  return res.data;
};

/* ===============================
   ALL ERP USERS (ADMIN)
================================ */
export const getERPUsers = async () => {
  const res = await API.get("/erp/admin/users");
  return res.data.users || [];
};

/* ===============================
   CREATE ERP USER (ADMIN)
   role: admin | manager | techlead
================================ */
export const createERPUser = async (payload) => {
  const res = await API.post("/erp/admin/create-user", payload);
  return res.data;
};

/* ===============================
   TOGGLE USER STATUS (ADMIN)
   active ↔ inactive
================================ */
export const toggleUserStatus = async (userId) => {
  const res = await API.put(`/erp/admin/user/${userId}/toggle-status`);
  return res.data;
};

/* ===============================
   RESET USER PASSWORD (ADMIN)
================================ */
export const resetUserPassword = async (userId, password) => {
  const res = await API.put(`/erp/admin/user/${userId}/reset-password`, {
    password,
  });
  return res.data;
};

/* ===============================
   CONTACT FORM SUBMISSIONS
================================ */
export const getContacts = async () => {
  const res = await API.get("/contact/all");
  return res.data;
};

/* ===============================
   DEMO REQUESTS
================================ */
export const getDemoRequests = async () => {
  const res = await API.get("/forms/demo");
  return res.data;
};

/* ===============================
   UPDATE ADMIN PROFILE
================================ */
export const updateAdminProfile = async (payload) => {
  const res = await API.put("/erp/admin/profile", payload);
  return res.data;
};

/* ===============================
   UPDATE PROJECT (ADMIN)
================================ */
export const updateProject = async (projectId, payload) => {
  const res = await API.put(`/erp/projects/${projectId}`, payload);
  return res.data;
};
