import { axiosInstance } from "@/api";
import type { ICommandResponseError as IError } from "@/api/types";
import type { ITasksResponse } from "./useGetTasks";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

export type IPutTaskRequest = Pick<ITasksResponse, "title" | "description" | "priority">;

export type IPutTaskVariables = { id: string } & IPutTaskRequest;

const putTask = ({ id, ...body }: IPutTaskVariables): Promise<ITasksResponse> =>
  axiosInstance.put(`/tasks/${id}`, body).then((res) => res.data);

export const usePutTask = (options?: UseMutationOptions<ITasksResponse, IError, IPutTaskVariables>) =>
  useMutation<ITasksResponse, IError, IPutTaskVariables>({
    mutationFn: putTask,
    ...options,
  });
