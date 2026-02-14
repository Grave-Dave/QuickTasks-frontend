import type { ITask, TaskStatus } from "@/types/task";
import { axiosInstance } from "./axios";

/**
 * Aktualizuje status zadania (PATCH /tasks/:id).
 */
export async function updateTaskStatus(id: string, status: TaskStatus): Promise<ITask> {
  const { data } = await axiosInstance.patch<ITask>(`/tasks/${id}`, { status });
  return data;
}
