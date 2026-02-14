import axios from "axios";
import { store } from "@/store";
import { uiSliceActions } from "@/store/slices/uiSlice";
import type { ICommandResponseError } from "./types";

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

type NotificationVariant = "error" | "success" | "warning";

function showApiNotification(message: string, messageStyle?: string) {
  const variant: NotificationVariant =
    messageStyle === "success" || messageStyle === "warning" ? messageStyle : "error";
  store.dispatch(uiSliceActions.setNotification({ message, variant }));
}

axiosInstance.interceptors.response.use(
  (response) => {
    const data = response.data as { message?: string; message_style?: string; show_message?: boolean } | undefined;
    if (data?.show_message && data?.message) {
      showApiNotification(data.message, data.message_style);
    }
    return response;
  },
  (error) => {
    const payload = error.response?.data as (ICommandResponseError & { errors?: Record<string, string>; title?: string }) | undefined;
    let message: string | undefined;

    if (payload?.show_message && payload?.message) {
      message = payload.message;
    } else if (payload?.errors && typeof payload.errors === "object") {
      message = Object.values(payload.errors).filter(Boolean).join(" ");
    } else if (payload?.title && typeof payload.title === "string") {
      message = payload.title;
    } else if (payload?.message) {
      message = payload.message;
    }

    if (message) {
      showApiNotification(message, payload?.message_style);
    } else if (error.message) {
      showApiNotification(error.message, "error");
    }
    return Promise.reject(error);
  }
);
