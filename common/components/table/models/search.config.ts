export interface ITableSearchConfig<TData> {
  fields: (keyof TData)[];
}

export class TableSearchConfig {
  public readonly searchText: string;
  public readonly fieldHeaders: string[];

  public constructor(fieldHeaders: string[]) {
    this.fieldHeaders = [...fieldHeaders];
    this.searchText = this.fieldHeaders.join(', ');
  }
}
