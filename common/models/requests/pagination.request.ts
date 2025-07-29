export class PaginationRequest {
  public constructor(
    public readonly pageNumber: number,
    public readonly pageSize: number,
  ) {}
}
