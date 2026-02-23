export class SortRequest {
  constructor(
    public readonly columnName: string,
    public readonly isAscending: boolean,
  ) {}
}
