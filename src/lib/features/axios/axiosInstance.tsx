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
    const status = error?.response?.status;
    const message = error?.response?.data?.message;
    if (
      status === 401 ||
      message === "Token expired" ||
      message === "Unauthorized"
    ) {
      authLocalStorageService.removeUser();
      window.location.href = "/auth/login";
    }
    throw error;
  }
);

export default axiosInstance;
