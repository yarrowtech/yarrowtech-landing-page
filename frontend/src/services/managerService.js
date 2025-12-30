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
  const res = await API.put(`/erp/manager/projects/${projectId}`, payload);
  return res.data;
};

/* ================================
   Manager → Delete Project
   (optional: delete client)
================================ */
export const deleteManagerProject = async (
  projectId,
  deleteClient = false
) => {
  const res = await API.delete(
    `/erp/manager/projects/${projectId}?deleteClient=${deleteClient}`
  );
  return res.data;
};

/* ================================
   Manager → Get Tech Leads
================================ */
export const getTechLeads = async () => {
  const res = await API.get("/erp/manager/techleads");
  const data = res.data;

  const list =
    data?.techLeads ||
    data?.techLead ||
    data?.leads ||
    data?.users ||
    data?.data ||
    [];

  return Array.isArray(list) ? list : [];
};

