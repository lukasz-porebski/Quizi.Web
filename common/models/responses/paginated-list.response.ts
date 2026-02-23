import { PaginationResponse } from '@common/models/responses/pagination.response';
import { isDefined } from '@common/utils/utils';

export class PaginatedListResponse<T> {
  public readonly items: T[];
  public readonly totalCount: number;
  public readonly pagination: PaginationResponse;

  constructor(data?: PaginatedListResponse<T>) {
    this.items = data?.items ?? [];
    this.totalCount = data?.totalCount ?? 0;
    this.pagination = isDefined(data?.pagination)
      ? new PaginationResponse(data.pagination)
      : new PaginationResponse();
  }
}
