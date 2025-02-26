import {
  ITableColumnConfig,
  TableColumnConfig,
} from '../models/columns/column.config';
import { TableColumnType } from '../enums/column-type.enum';
import { ITableEnumColumnConfig } from '../models/columns/enum-column.config';
import { ITableImageColumnConfig } from '../models/columns/image-column.config';

export class TableColumnBuilder<TData> {
  private readonly _columns: TableColumnConfig<TData, any>[] = [];

  public addBoolean(config: ITableColumnConfig): this {
    this._columns.push(new TableColumnConfig(config, TableColumnType.Boolean));
    return this;
  }

  public addDate(config: ITableColumnConfig): this {
    this._columns.push(new TableColumnConfig(config, TableColumnType.Date));
    return this;
  }

  public addDateWithTime(config: ITableColumnConfig): this {
    this._columns.push(
      new TableColumnConfig(config, TableColumnType.DateWithTime),
    );
    return this;
  }

  public addHours(config: ITableColumnConfig): this {
    this._columns.push(new TableColumnConfig(config, TableColumnType.Hours));
    return this;
  }

  public addMinutes(config: ITableColumnConfig): this {
    this._columns.push(new TableColumnConfig(config, TableColumnType.Minutes));
    return this;
  }

  public addNumber(config: ITableColumnConfig): this {
    this._columns.push(new TableColumnConfig(config, TableColumnType.Number));
    return this;
  }

  public addPercent(config: ITableColumnConfig): this {
    this._columns.push(new TableColumnConfig(config, TableColumnType.Percent));
    return this;
  }

  public addPrice(config: ITableColumnConfig): this {
    this._columns.push(new TableColumnConfig(config, TableColumnType.Price));
    return this;
  }

  public addText(config: ITableColumnConfig): this {
    this._columns.push(new TableColumnConfig(config, TableColumnType.Text));
    return this;
  }

  public addEnum<TValue>(config: ITableEnumColumnConfig<TValue>): this {
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

  public build(): ReadonlyArray<TableColumnConfig<TData, any>> {
    return this._columns;
  }
}
