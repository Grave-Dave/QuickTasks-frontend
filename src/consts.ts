import type {TaskPriority, TaskStatus} from "@/types/task.ts";

export const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: "Do zrobienia",
  done: "Zrobione",
};

/** Kolor wizualny zadania na podstawie statusu (do zrobienia = pomarańczowy, zrobione = zielony) */
export const STATUS_COLOR: Record<TaskStatus, string> = {
  todo: "#f59e0b",
  done: "#22c55e",
};

export const PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: "Niski",
  medium: "Średni",
  high: "Wysoki",
};