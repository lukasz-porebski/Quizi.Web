import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TableColumnType } from '../../enums/column-type.enum';
import { DateFormat } from '../../../../enums/date-format.enum';
import { MatCheckbox } from '@angular/material/checkbox';
import { toPercent, toPrice } from '../../../../utils/utils';
import { TableColumnConfig } from '../../models/columns/column.config';
import { TableRow } from '../../models/row.model';

@Component({
  selector: 'app-table-row',
  imports: [DatePipe, MatCheckbox],
  templateUrl: './row.component.html',
  styleUrl: './row.component.scss',
})
export class TableRowComponent<TData> {
  public column = input.required<TableColumnConfig<TData, any>>();
  public row = input.required<TableRow<TData>>();

  public readonly AppTableColumnType = TableColumnType;
  public readonly DateFormat = DateFormat;

  public getPercent(value: number): string {
    return toPercent(value);
  }

  public getPrice(value: number): string {
    return toPrice(value);
  }

  public getEnumText(column: TableColumnConfig<TData, any>, enumValue: any): string {
    return column.enumDefinition.find((e) => e.value === enumValue)?.text ?? '';
  }
}
