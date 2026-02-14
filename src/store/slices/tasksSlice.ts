import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ITask, TaskStatus } from "@/types/task";
import { mockTasks } from "@/mocks/tasks";

interface ITasksSlice {
  tasks: ITask[];
}

const initialState: ITasksSlice = {
  tasks: mockTasks,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    updateTaskStatus: (state, action: PayloadAction<{ id: string; status: TaskStatus }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) task.status = action.payload.status;
    },
    setTasks: (state, action: PayloadAction<ITask[]>) => {
      state.tasks = action.payload;
    },
  },
});

export const tasksSliceActions = tasksSlice.actions;
export default tasksSlice.reducer;
