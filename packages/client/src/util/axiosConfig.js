import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_NODE_ENV === "development" ? process.env.REACT_APP_API_DOMAIN : process.env.REACT_APP_API_DOMAIN,
  withCredentials: true,
});

export const setAuthHeaders = (token) => {
  if (!token) delete api.defaults.headers.common["Authorization"];

  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default api;
