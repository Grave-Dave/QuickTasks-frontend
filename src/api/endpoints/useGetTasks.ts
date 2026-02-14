import { axiosInstance } from "@/api";
import type {
  IFiltersRequest,
  IPaginationRequest,
  IPaginationResponse,
  ISearchRequest,
  ICommandResponseError as IError,
} from "@/api/types";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

export interface ITasksResponse {
  id: string;
  title: string;
  description: string | null;
  status: boolean;
  priority: number;
}
export type IRequest = IPaginationRequest & IFiltersRequest & ISearchRequest;

export type IResponse = IPaginationResponse<ITasksResponse>;

const getTasks = (params?: IRequest): Promise<IResponse> =>
  axiosInstance.get(`/tasks`, { params }).then((res) => res.data);

export const useGetTasks = (params?: IRequest, options?: UseQueryOptions<IResponse, IError>) =>
  useQuery<IResponse, IError>({
    queryKey: ['tasks', params],
    queryFn: () => getTasks(params),
    ...options,
  });
