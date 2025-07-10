import axios from "axios";

// AxiosInstance.js
const axiosInstance = axios.create({
  baseURL: process.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Comment out for testing
});
export default axiosInstance
