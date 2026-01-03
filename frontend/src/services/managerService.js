import API from "./axiosInstance";

/* =====================================================
   MANAGER → CREATE CLIENT + PROJECT
===================================================== */
export const createClientAndProject = async (payload) => {
  const res = await API.post("/erp/manager/create-project", payload);
  return res.data;
};

/* =====================================================
   MANAGER → PROJECTS
===================================================== */

/**
 * Get all manager projects
 * Uses MongoDB _id internally
 */
export const getManagerProjects = async () => {
  const res = await API.get("/erp/manager/projects");
  return Array.isArray(res.data?.projects) ? res.data.projects : [];
};

/**
 * Update project (progress, status, delivery)
 * @param {string} projectId MongoDB _id
 */
export const updateManagerProject = async (projectId, payload) => {
  const res = await API.put(`/erp/manager/projects/${projectId}`, payload);
  return res.data;
};

/**
 * Delete project (optionally delete client)
 * @param {string} projectId MongoDB _id
 */
export const deleteManagerProject = async (
  projectId,
  deleteClient = false
) => {
  const res = await API.delete(
    `/erp/manager/projects/${projectId}?deleteClient=${deleteClient}`
  );
  return res.data;
};

/* =====================================================
   MANAGER → TECH LEADS
===================================================== */
export const getTechLeads = async () => {
  const res = await API.get("/erp/manager/techleads");

  const list =
    res.data?.techLeads ||
    res.data?.techLead ||
    res.data?.leads ||
    res.data?.users ||
    res.data?.data ||
    [];

  return Array.isArray(list) ? list : [];
};

/* =====================================================
   MANAGER → PAYMENTS
===================================================== */

/**
 * Get payments for a project
 * @param {string} projectId MongoDB _id ONLY
 */
export const getProjectPayments = async (projectId) => {
  if (!projectId) return [];
  const res = await API.get(`/erp/payments/project/${projectId}`);
  return Array.isArray(res.data) ? res.data : [];
};

/**
 * Add new payment
 */
export const addProjectPayment = async (payload) => {
  const res = await API.post("/erp/payments", payload);
  return res.data;
};

/**
 * Update payment (PUT matches backend)
 * @param {string} paymentId MongoDB _id
 */
export const updateProjectPayment = async (paymentId, payload) => {
  const res = await API.put(`/erp/payments/${paymentId}`, payload);
  return res.data;
};
