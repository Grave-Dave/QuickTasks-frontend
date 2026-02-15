import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ITasksResponse } from "@/api/types";

interface IUiSlice {
  notification: {
    message: string;
    variant: "error" | "success" | "warning";
  } | null;
  isTaskDialogOpen: boolean;
  editingTask: ITasksResponse | null;
}

const initialState: IUiSlice = {
  notification: null,
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
    openTaskDialog: (state, action: PayloadAction<ITasksResponse | undefined>) => {
      state.isTaskDialogOpen = true;
      state.editingTask = action.payload ?? null;
    },
    closeTaskDialog: (state) => {
      state.isTaskDialogOpen = false;
    },
  },
});

export const uiSliceActions = uiSlice.actions;

export default uiSlice.reducer;