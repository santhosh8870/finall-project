import axios from "axios";

const api = axios.create({
  baseURL: "https://finall-project-3.onrender.com",
  withCredentials: true,
});

export default api;
