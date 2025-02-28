export class TableRow<TData> {
  public constructor(
    public readonly data: TData,
    public hovered: boolean = false,
  ) {}
}
