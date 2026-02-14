import axios from "axios";

const API_URL =
  import.meta.env.VITE_BACKEND_URL ||
  "https://ridego-final-production.up.railway.app";

const api = axios.create({
  baseURL: API_URL,
});

export default api;