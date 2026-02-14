import { axiosInstance } from "@/api";
import type { ICommandResponseError as IError } from "@/api/types";
import type { ITasksResponse } from "./useGetTasks";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

export type IPatchTaskRequest = Pick<ITasksResponse, "status">;

const patchTask = ({ id, status }: { id: string; status: ITasksResponse["status"] }): Promise<ITasksResponse> =>
  axiosInstance.patch(`/tasks/${id}`, { status }).then((res) => res.data);

export const usePatchTask = (
  options?: UseMutationOptions<ITasksResponse, IError, { id: string; status: ITasksResponse["status"] }>
) =>
  useMutation<ITasksResponse, IError, { id: string; status: ITasksResponse["status"] }>({
    mutationFn: patchTask,
    ...options,
  });
