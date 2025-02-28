export interface ITableRowSelectionConfig<TDataSource> {
  onRowSelect?: (row?: TDataSource) => void;
  initialSelection?: (data: TDataSource[]) => TDataSource;
}

export class TableRowSelectionConfig<TDataSource> {
  public readonly onRowSelect: (row?: TDataSource) => void;
  public readonly initialSelection?: (data: TDataSource[]) => TDataSource;

  constructor(config: ITableRowSelectionConfig<TDataSource>) {
    this.onRowSelect = config.onRowSelect ?? (() => {});
    this.initialSelection = config.initialSelection ?? undefined;
  }
}
