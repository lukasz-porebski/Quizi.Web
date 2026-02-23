import type { ITableColumnConfig } from '@common/components/table/models/columns/column.config';
import { TableColumnConfig } from '@common/components/table/models/columns/column.config';
import { TableColumnType } from '@common/components/table/enums/column-type.enum';
import type { ITableEnumColumnConfig } from '@common/components/table/models/columns/enum-column.config';
import type { ITableImageColumnConfig } from '@common/components/table/models/columns/image-column.config';

export class TableColumnBuilder<TData> {
  private readonly _columns: TableColumnConfig<TData, unknown>[] = [];

  public addBoolean(config: ITableColumnConfig<TData>): this {
    this._columns.push(new TableColumnConfig(config, TableColumnType.Boolean));
    return this;
  }

  public addDate(config: ITableColumnConfig<TData>): this {
    this._columns.push(new TableColumnConfig(config, TableColumnType.Date));
    return this;
  }

  public addDateWithTime(config: ITableColumnConfig<TData>): this {
    this._columns.push(new TableColumnConfig(config, TableColumnType.DateWithTime));
    return this;
  }

  public addHours(config: ITableColumnConfig<TData>): this {
    this._columns.push(new TableColumnConfig(config, TableColumnType.Hours));
    return this;
  }

  public addMinutes(config: ITableColumnConfig<TData>): this {
    this._columns.push(new TableColumnConfig(config, TableColumnType.Minutes));
    return this;
  }

  public addTimeSpan(config: ITableColumnConfig<TData>): this {
    this._columns.push(new TableColumnConfig(config, TableColumnType.TimeSpan));
    return this;
  }

  public addNumber(config: ITableColumnConfig<TData>): this {
    this._columns.push(new TableColumnConfig(config, TableColumnType.Number));
    return this;
  }

  public addPercent(config: ITableColumnConfig<TData>): this {
    this._columns.push(new TableColumnConfig(config, TableColumnType.Percent));
    return this;
  }

  public addPrice(config: ITableColumnConfig<TData>): this {
    this._columns.push(new TableColumnConfig(config, TableColumnType.Price));
    return this;
  }

  public addText(config: ITableColumnConfig<TData>): this {
    this._columns.push(new TableColumnConfig(config, TableColumnType.Text));
    return this;
  }

  public addEnum<TValue>(config: ITableEnumColumnConfig<TData, TValue>): this {
    this._columns.push(
      new TableColumnConfig(config, TableColumnType.Enum, {
        enumDefinition: config.enumDefinition,
      }),
    );
    return this;
  }

  public addImage(config: ITableImageColumnConfig<TData>): this {
    this._columns.push(
      new TableColumnConfig(config, TableColumnType.Image, {
        imgPatch: config.imgPatch,
      }),
    );
    return this;
  }

  public build(): ReadonlyArray<TableColumnConfig<TData, unknown>> {
    return this._columns;
  }
}
