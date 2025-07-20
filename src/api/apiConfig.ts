import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";
import { useNavigate } from "react-router";

const BASE_URL =
  import.meta.env.VITE_BASE_URL || "http://localhost:5000/api/v1";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === "401") {
      const navigate = useNavigate();
      const { logout } = useAuthStore((state) => state);
      logout();
      localStorage.removeItem("auth-store");
      navigate("/login");
    }
    return Promise.reject(error);
  }
);
