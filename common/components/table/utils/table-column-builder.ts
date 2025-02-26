import { ITableColumnConfig, TableColumnConfig } from '../configs/columns/table-column-config';
import { AppTableColumnType } from '../enums/table-column-type.enum';
import { ITableEnumColumnConfig } from '../configs/columns/table-enum-column-config';
import { ITableImageColumnConfig } from '../configs/columns/table-image-column-config';

export class TableColumnBuilder<TData> {
  private readonly _columns: TableColumnConfig<TData, any>[] = [];

  public addBoolean(config: ITableColumnConfig): this {
    this._columns.push(new TableColumnConfig(config, AppTableColumnType.Boolean));
    return this;
  }

  public addDate(config: ITableColumnConfig): this {
    this._columns.push(new TableColumnConfig(config, AppTableColumnType.Date));
    return this;
  }

  public addDateWithTime(config: ITableColumnConfig): this {
    this._columns.push(new TableColumnConfig(config, AppTableColumnType.DateWithTime));
    return this;
  }

  public addHours(config: ITableColumnConfig): this {
    this._columns.push(new TableColumnConfig(config, AppTableColumnType.Hours));
    return this;
  }

  public addMinutes(config: ITableColumnConfig): this {
    this._columns.push(new TableColumnConfig(config, AppTableColumnType.Minutes));
    return this;
  }

  public addNumber(config: ITableColumnConfig): this {
    this._columns.push(new TableColumnConfig(config, AppTableColumnType.Number));
    return this;
  }

  public addPercent(config: ITableColumnConfig): this {
    this._columns.push(new TableColumnConfig(config, AppTableColumnType.Percent));
    return this;
  }

  public addPrice(config: ITableColumnConfig): this {
    this._columns.push(new TableColumnConfig(config, AppTableColumnType.Price));
    return this;
  }

  public addText(config: ITableColumnConfig): this {
    this._columns.push(new TableColumnConfig(config, AppTableColumnType.Text));
    return this;
  }

  public addEnum<TValue>(config: ITableEnumColumnConfig<TValue>): this {
    this._columns.push(new TableColumnConfig(config, AppTableColumnType.Enum, {
      enumDefinition: config.enumDefinition,
    }));
    return this;
  }

  public addImage(config: ITableImageColumnConfig<TData>): this {
    this._columns.push(new TableColumnConfig(config, AppTableColumnType.Image, {
      imgPatch: config.imgPatch,
    }));
    return this;
  }

  public build(): ReadonlyArray<TableColumnConfig<TData, any>> {
    return this._columns;
  }
}
