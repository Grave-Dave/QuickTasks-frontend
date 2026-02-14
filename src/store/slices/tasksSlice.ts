import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { mockTasks } from "@/mocks/tasks";
import type {ITasksResponse} from "@/api/types";

interface ITasksSlice {
  tasks: ITasksResponse[];
}

const initialState: ITasksSlice = {
  tasks: mockTasks,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    updateTaskStatus: (state, action: PayloadAction<{ id: string; status: boolean }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) task.status = action.payload.status;
    },
    setTasks: (state, action: PayloadAction<ITasksResponse[]>) => {
      state.tasks = action.payload;
    },
  },
});

export const tasksSliceActions = tasksSlice.actions;
export default tasksSlice.reducer;
