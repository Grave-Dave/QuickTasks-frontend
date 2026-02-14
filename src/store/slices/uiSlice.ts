import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ITask } from "@/types/task";

interface IUiSlice {
  notification: {
    message: string;
    variant: "error" | "success" | "warning";
  } | null;
  notificationModal: {
    title: string;
    content: string;
  } | null;
  isTaskDialogOpen: boolean;
  editingTask: ITask | null;
}

const initialState: IUiSlice = {
  notification: null,
  notificationModal: null,
  isTaskDialogOpen: false,
  editingTask: null,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<IUiSlice["notification"]>) => {
      state.notification = action.payload;
    },
    setNotificationModal: (state, action: PayloadAction<IUiSlice["notificationModal"]>) => {
      state.notificationModal = action.payload;
    },
    openTaskDialog: (state, action: PayloadAction<ITask | undefined>) => {
      state.isTaskDialogOpen = true;
      state.editingTask = action.payload ?? null;
    },
    closeTaskDialog: (state) => {
      state.isTaskDialogOpen = false;
      state.editingTask = null;
    },
  },
});

export const uiSliceActions = uiSlice.actions;

export default uiSlice.reducer;