import { axiosInstance } from "@/api";
import type { ICommandResponseError as IError } from "@/api/types";
import type { ITasksResponse } from "./useGetTasks";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

export type IPostTaskRequest = Pick<ITasksResponse, "title" | "description" | "priority">;

const postTask = (body: IPostTaskRequest): Promise<ITasksResponse> =>
  axiosInstance.post(`/tasks`, body).then((res) => res.data);

export const usePostTask = (options?: UseMutationOptions<ITasksResponse, IError, IPostTaskRequest>) =>
  useMutation<ITasksResponse, IError, IPostTaskRequest>({
    mutationFn: postTask,
    ...options,
  });
