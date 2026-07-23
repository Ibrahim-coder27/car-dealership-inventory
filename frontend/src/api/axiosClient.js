import axios from "axios";
import { API_TIMEOUT } from "../constants/api";
import { setupInterceptors } from "./interceptors";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "",

  timeout: API_TIMEOUT,

  headers: {
    "Content-Type": "application/json",
  },
});

setupInterceptors(axiosClient);

export default axiosClient;