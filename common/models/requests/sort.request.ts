export class SortRequest {
  public constructor(
    public readonly columnName: string,
    public readonly isAscending: boolean,
  ) {}
}
