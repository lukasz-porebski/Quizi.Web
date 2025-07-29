import { PaginationResponse } from './pagination.response';

export class PaginatedListResponse<T> {
  public readonly items: T[];
  public readonly totalCount: number;
  public readonly pagination: PaginationResponse;

  public constructor(data: PaginatedListResponse<T>) {
    this.items = data.items;
    this.totalCount = data.totalCount;
    this.pagination = new PaginationResponse(data.pagination);
  }
}
