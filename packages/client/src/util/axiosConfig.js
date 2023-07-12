import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.NODE_ENV === "production"
      ? import.meta.env.REACT_APP_API_URL
      : "http://localhost:3001",
  withCredentials: true,
});

export const setAuthHeaders = (token) => {
  if (!token) delete api.defaults.headers.common["Authorization"];

  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default api;
