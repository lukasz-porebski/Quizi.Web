import { TableColumnConfig } from './columns/column.config';
import { ITableColumnActionsConfig, TableColumnActionsConfig } from './columns/column-actions.config';
import { ITableColumnWithIconConfig, TableColumnWithIconConfig } from './columns/column-with-icon.config';
import { ITablePaginatorConfig, TablePaginatorConfig } from './paginator.config';
import { ITableSearchConfig, TableSearchConfig } from './search.config';
import { ITableRowSelectionConfig, TableRowSelectionConfig } from './row-selection.config';
import { TableColumnBuilder } from '../utils/column.builder';
import { isDefined } from '../../../utils/utils';
import { Optional } from '../../../types/optional.type';
import { BaseTableDataSource } from '../data-source/base-data-source';
import { TableRow } from './row.model';

export interface ITableConfig<TData> {
  dataSource: BaseTableDataSource<TableRow<TData>>;
  columns: (builder: TableColumnBuilder<TData>) => ReadonlyArray<TableColumnConfig<TData, any>>;
  columnsWithIcon?: ITableColumnWithIconConfig<TData>[];
  actionsDefinition?: ITableColumnActionsConfig<TData>;
  headerSticky?: boolean;
  paginator?: ITablePaginatorConfig;
  search?: ITableSearchConfig<TData>;
  markRowCondition?: (row: TData) => boolean;
  selection?: ITableRowSelectionConfig<TData>;
}

export class TableConfig<TData> {
  public readonly dataSource: BaseTableDataSource<TableRow<TData>>;
  public readonly columns: ReadonlyArray<TableColumnConfig<TData, any>>;
  public readonly columnsWithIcon: TableColumnWithIconConfig<TData>[];
  public readonly actionsDefinition?: TableColumnActionsConfig<TData>;
  public readonly columnNames: string[];
  public readonly headerSticky: boolean;
  public readonly paginator?: TablePaginatorConfig;
  public readonly search?: TableSearchConfig;
  public readonly markRowCondition: (row: TData) => boolean;
  public readonly selection?: TableRowSelectionConfig<TData>;

  public constructor(config: ITableConfig<TData>) {
    this.dataSource = config.dataSource;
    this.columns = config.columns(new TableColumnBuilder<TData>());

    this.columnsWithIcon = (config?.columnsWithIcon ?? []).map(
      (c) => new TableColumnWithIconConfig<TData>(c),
    );

    if (isDefined(config.actionsDefinition)) {
      this.actionsDefinition = new TableColumnActionsConfig(config.actionsDefinition);
    }

    this.columnNames = this._getColumnNames(this.columns, this.columnsWithIcon, this.actionsDefinition);
    this.headerSticky = isDefined(config.headerSticky) ? config.headerSticky : false;

    if (isDefined(config.paginator)) {
      this.paginator = new TablePaginatorConfig(config.paginator);
    }
    if (isDefined(config.search)) {
      const fieldHeaders = config.search.fields.map(
        (f) => this.columns.find((c) => c.field === f)!.header.text,
      );
      this.search = new TableSearchConfig(fieldHeaders);
    }
    this.markRowCondition = config.markRowCondition ?? (() => false);
    if (isDefined(config.selection)) {
      this.selection = new TableRowSelectionConfig<TData>(config.selection);
    }
  }

  private _getColumnNames(
    columns: ReadonlyArray<TableColumnConfig<TData, any>>,
    columnsWithIcon: TableColumnWithIconConfig<TData>[],
    actionsDefinition: Optional<TableColumnActionsConfig<TData>>,
  ): string[] {
    const columnNames = columns.map((c) => c.columnDef);

    columnsWithIcon.forEach((c) => columnNames.push(c.columnName));

    if (isDefined(actionsDefinition) && isDefined(actionsDefinition.name)) {
      columnNames.push(actionsDefinition.name);
    }

    return columnNames;
  }
}
