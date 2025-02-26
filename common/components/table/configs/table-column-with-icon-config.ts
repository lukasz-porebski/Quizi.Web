import { Icon } from '../../../enums/icon.enum';

export interface ITableColumnWithIconConfig<TData> {
  icon: Icon;
  onClick: (data: TData) => void;
}

export class TableColumnWithIconConfig<TData> {
  public icon: Icon;
  public onClick: (data: TData) => void;
  public columnName: string;

  constructor(config: ITableColumnWithIconConfig<TData>) {
    this.icon = config.icon;
    this.onClick = config.onClick;
    this.columnName = `lp-table-column-with-icon-${this.icon}`;
  }
}
