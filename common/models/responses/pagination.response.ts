import { SortResponse } from '@common/models/responses/sort.response';
import { isDefined } from '@common/utils/utils';

export class PaginationResponse {
  public readonly pageNumber: number;
  public readonly pageSize: number;
  public readonly sort?: SortResponse;
  public readonly search?: string;

  public constructor(data?: PaginationResponse) {
    this.pageNumber = data?.pageNumber ?? 0;
    this.pageSize = data?.pageSize ?? 0;
    this.sort = isDefined(data?.sort) ? new SortResponse(data!.sort) : undefined;
    this.search = data?.search;
  }
}
