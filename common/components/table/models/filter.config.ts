export interface ITableFilterConfig {
  placeholder?: string;
}

export class TableFilterConfig {
  public placeholder: string;

  public constructor(config: ITableFilterConfig) {
    this.placeholder = config.placeholder ?? '';
  }
}
