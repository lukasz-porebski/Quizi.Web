import { SortRequest } from '@common/models/requests/sort.request';

export class PaginationRequest {
  public constructor(
    public readonly pageNumber: number,
    public readonly pageSize: number,
    public readonly sort?: SortRequest,
    public readonly search?: string,
  ) {}
}
