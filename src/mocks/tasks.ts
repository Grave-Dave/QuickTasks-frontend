import type { ITask, ITasksResponse } from "@/types/task";

export const mockTasks: ITask[] = [
  {
    id: "task-1",
    title: "Przygotować prezentację dla klienta",
    description: "Slajdy z podsumowaniem Q4 i planem na Q1",
    status: "done",
    priority: "high",
  },
  {
    id: "task-2",
    title: "Code review PR #142",
    description: null,
    status: "todo",
    priority: "medium",
  },
  {
    id: "task-3",
    title: "Zaktualizować dokumentację API",
    description: "Endpointy /users i /tasks – dodać przykłady Endpointy /users i /tasks – dodać przykłady Endpointy /users i /tasks – dodać przykłady Endpointy /users i /tasks – dodać przykłady Endpointy /users i /tasks – dodać przykłady Endpointy /users i /tasks – dodać przykłady",
    status: "done",
    priority: "low",
  },
  {
    id: "task-4",
    title: "Spotkanie z zespołem",
    description: "Daily o 10:00, room A",
    status: "todo",
    priority: "medium",
  },
  {
    id: "task-5",
    title: "Naprawić bug z filtrowaniem listy",
    description: "Filtr po dacie nie działa przy pustej dacie",
    status: "done",
    priority: "high",
  },
];

/**
 * Symuluje odpowiedź BE z listą zadań (np. GET /api/tasks).
 */
export const mockTasksResponse: ITasksResponse = {
  data: mockTasks,
  total: mockTasks.length,
  page: 1,
  limit: 10,
};
