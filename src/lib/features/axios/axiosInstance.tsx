import axios from "axios";
import { authLocalStorageService } from "../auth/authLocalStorageService.ts";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = authLocalStorageService.getUser()?.token;

    if (token) {
      config.headers.Authorization = token;
    }
    if (config.data && config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      authLocalStorageService.removeUser();
      window.location.reload();
    }

    throw error;
  }
);

export default axiosInstance;
