import axios from "axios";

// AxiosInstance.js
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Comment out for testing
});
export default axiosInstance