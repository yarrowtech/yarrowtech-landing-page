import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach ERP token automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("erp_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Global error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("ERP session expired");
      localStorage.removeItem("erp_token");
      localStorage.removeItem("erp_role");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
// 🔐 Attach ERP token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("erp_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ⏳ AUTO LOGOUT ON SESSION EXPIRE
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Session expired, logging out");

      localStorage.removeItem("erp_token");
      localStorage.removeItem("erp_role");
      localStorage.removeItem("erp_user");

      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default API;
