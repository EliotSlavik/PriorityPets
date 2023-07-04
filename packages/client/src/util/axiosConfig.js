import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api/",
});

export const setAuthHeaders = (token) => {
  if (!token) delete api.defaults.headers.common["Authorization"];

  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default api;
