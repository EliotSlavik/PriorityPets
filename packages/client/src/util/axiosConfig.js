import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.NODE_ENV === "production"
      ? import.meta.env.REACT_APP_API_URL
      : "http://localhost:3001",
  withCredentials: true,
});

export default api;
