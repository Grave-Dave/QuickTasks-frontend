import type {ITasksResponse} from "@/api/endpoints/useGetTasks.ts";

export const mockTasks: ITasksResponse[] = [
  {
    id: "task-1",
    title: "Przygotować prezentację dla klienta",
    description: "Slajdy z podsumowaniem Q4 i planem na Q1",
    status: true,
    priority: 3,
  },
  {
    id: "task-2",
    title: "Code review PR #142",
    description: null,
    status: false,
    priority: 2,
  },
  {
    id: "task-3",
    title: "Zaktualizować dokumentację API",
    description: "Endpointy /users i /tasks – dodać przykłady Endpointy /users i /tasks – dodać przykłady Endpointy /users i /tasks – dodać przykłady Endpointy /users i /tasks – dodać przykłady Endpointy /users i /tasks – dodać przykłady Endpointy /users i /tasks – dodać przykłady",
    status: true,
    priority: 1,
  },
  {
    id: "task-4",
    title: "Spotkanie z zespołem",
    description: "Daily o 10:00, room A",
    status: false,
    priority: 2,
  },
  {
    id: "task-5",
    title: "Naprawić bug z filtrowaniem listy",
    description: "Filtr po dacie nie działa przy pustej dacie",
    status: true,
    priority: 3,
  },
];
