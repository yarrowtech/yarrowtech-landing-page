import API from "./axiosInstance";

/* ================================
   TECH LEAD → DASHBOARD STATS
================================ */
export const getTechLeadStats = async () => {
  const res = await API.get("/erp/techlead/projects");

  const projects = res.data.projects || [];

  return {
    activeProjects: projects.filter(p => p.status !== "completed").length,
    totalProjects: projects.length,
  };
};
