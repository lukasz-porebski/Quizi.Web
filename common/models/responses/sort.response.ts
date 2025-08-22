export class SortResponse {
  public readonly columnName: string;
  public readonly isAscending: boolean;

  public constructor(data: SortResponse) {
    this.columnName = data.columnName;
    this.isAscending = data.isAscending;
  }
}
