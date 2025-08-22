export class PaginationResponse {
  public readonly pageNumber: number;
  public readonly pageSize: number;

  public constructor(data?: PaginationResponse) {
    this.pageNumber = data?.pageNumber ?? 0;
    this.pageSize = data?.pageSize ?? 0;
  }
}
