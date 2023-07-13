import axios from "axios";

const api = axios.create({
  baseURL:
    process.env. REACT_APP_NODE_ENV === "production"
      ? process.env.REACT_APP_API_URL
      : "http://localhost:3001/api/",
  withCredentials: true,
});

export const setAuthHeaders = (token) => {
  if (!token) delete api.defaults.headers.common["Authorization"];

  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default api;
