export class TableRow<TData> {
  constructor(
    public readonly data: TData,
    public hovered = false,
  ) {}
}
