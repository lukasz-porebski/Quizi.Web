export class PaginationResponse {
  public readonly pageNumber: number;
  public readonly pageSize: number;

  public constructor(data: PaginationResponse) {
    this.pageNumber = data.pageNumber;
    this.pageSize = data.pageSize;
  }
}
