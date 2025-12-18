import API from "./axiosInstance";

/* ================================
   Manager → Create Client + Project
================================ */
export const createClientAndProject = async (payload) => {
  const res = await API.post("/erp/manager/create-project", payload);
  return res.data;
};

/* ================================
   Manager → Get All Projects
================================ */
export const getManagerProjects = async () => {
  const res = await API.get("/erp/manager/projects");
  return res.data?.projects || [];
};

/* ================================
   Manager → Update Project
================================ */
export const updateManagerProject = async (projectId, payload) => {
  const res = await API.put(`/erp/manager/project/${projectId}`, payload);
  return res.data;
};

/* Get list of tech leads */
export const getTechLeads = async () => {
  const res = await API.get("/erp/manager/techleads");
  return res.data.techLeads || [];  // ← FIXED
};

/* new: delete project (optional delete client) */
export const deleteManagerProject = async (projectId, deleteClient = false) => {
  const res = await API.delete(`/erp/manager/project/${projectId}?deleteClient=${deleteClient}`);
  return res.data;
};
