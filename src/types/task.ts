/**
 * Status zadania
 */
export type TaskStatus = "todo" | "done";

/**
 * Priorytet zadania
 */
export type TaskPriority = "low" | "medium" | "high";

/**
 * Model zadania zwracany z backendu
 */
export interface ITask {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
}

/**
 * Odpowiedź listy zadań z BE (paginated)
 */
export interface ITasksResponse {
  data: ITask[];
  total: number;
  page: number;
  limit: number;
}
