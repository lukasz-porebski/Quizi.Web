import { ITableColumnActionConfig, TableColumnActionConfig } from './table-column-action-config';

export interface ITableColumnActionsConfig<TData> {
  name?: string;
  actions: ITableColumnActionConfig<TData>[];
  stickyEnd?: boolean;
}

export class TableColumnActionsConfig<TData> {
  public name: string;
  public actions: TableColumnActionConfig<TData>[];
  public stickyEnd: boolean;

  public constructor(config: ITableColumnActionsConfig<TData>) {
    this.name = config.name ?? 'appTableActions';
    this.actions = config.actions.map(a => new TableColumnActionConfig(a));
    this.stickyEnd = config.stickyEnd ?? true;
  }
}
