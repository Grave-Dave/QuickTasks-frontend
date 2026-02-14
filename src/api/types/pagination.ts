export interface IPaginationRequest {
  page?: number;
  limit?: number;
}

export interface IPaginationResponse<T> {
  total_count: number;
  total_pages: number;
  items: T[];
}