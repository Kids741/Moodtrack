// src/utils/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api", // backend base URL
  withCredentials: true,
});

// Add a request interceptor for auth token
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage and add to Authorization header
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Cookies are handled automatically with withCredentials: true
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor for error handling (optional)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle global error states here
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // Silently handle expected errors (like 401 from /auth/me)
      if (!error.config.url.includes('/auth/me') || error.response.status !== 401) {
        console.error("API Error Response:", error.response.data);
      }
      
      // Handle unauthorized errors (e.g., token expired)
      if (error.response.status === 401) {
        // Silently handle 401 from /auth/me (it's expected when not logged in)
        if (!error.config.url.includes('/auth/me')) {
          console.warn("Unauthorized access, redirecting to login");
        }
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("API No Response:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("API Request Error:", error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;
