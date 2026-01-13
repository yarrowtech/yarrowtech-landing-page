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
 */
export const getManagerProjects = async () => {
  const res = await API.get("/erp/manager/projects");
  return Array.isArray(res.data?.projects) ? res.data.projects : [];
};

/**
 * Update project (progress, status, delivery)
 */
export const updateManagerProject = async (projectId, payload) => {
  const res = await API.put(`/erp/manager/projects/${projectId}`, payload);
  return res.data;
};

/**
 * Delete project (optionally delete client)
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
   MANAGER → CRM (DEMO REQUESTS / LEADS)
===================================================== */

/**
 * Get all CRM demo requests (leads)
 * ✅ CORRECT ROUTE
 */
export const getManagerDemoRequests = async () => {
  const res = await API.get("/forms/manager/demo");
  return Array.isArray(res.data?.requests) ? res.data.requests : [];
};

/**
 * Update CRM lead status
 * status: new | contacted | in-progress | closed
 * ✅ CORRECT ROUTE
 */
export const updateManagerLeadStatus = async (leadId, status) => {
  const res = await API.put(
    `/forms/manager/demo/${leadId}/status`,
    { status }
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
    res.data?.users ||
    [];

  return Array.isArray(list) ? list : [];
};

/* =====================================================
   MANAGER → PAYMENTS
===================================================== */

/**
 * Get payments for a project
 */
export const getProjectPayments = async (projectId) => {
  if (!projectId) return [];
  const res = await API.get(`/erp/payments/project/${projectId}`);
  return Array.isArray(res.data) ? res.data : [];
};

/**
 * Add payment
 */
export const addProjectPayment = async (payload) => {
  const res = await API.post("/erp/payments", payload);
  return res.data;
};

/**
 * Update payment
 */
export const updateProjectPayment = async (paymentId, payload) => {
  const res = await API.put(`/erp/payments/${paymentId}`, payload);
  return res.data;
};
