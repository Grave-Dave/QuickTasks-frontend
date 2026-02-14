import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL ?? "";
const basePath = import.meta.env.VITE_API_BASE_PATH ?? "/api";

export const axiosInstance = axios.create({
  baseURL: `${apiUrl}${basePath}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 10000,
});
