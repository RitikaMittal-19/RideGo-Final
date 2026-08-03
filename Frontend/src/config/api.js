import axios from "axios";

const API_URL =
  import.meta.env.VITE_BACKEND_URL ||
"https://ridego-final.onrender.com";
const api = axios.create({
  baseURL: API_URL,
});

export default api;