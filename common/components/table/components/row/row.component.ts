import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TableColumnType } from '@common/components/table/enums/column-type.enum';
import { DateFormat } from '@common/enums/date-format.enum';
import { MatCheckbox } from '@angular/material/checkbox';
import { toPercent, toPrice } from '@common/utils/utils';
import type { TableColumnConfig } from '@common/components/table/models/columns/column.config';
import type { TableRow } from '@common/components/table/models/row.model';
import type { TimeSpanModel } from '@common/models/time-span.model';
import { TimeSpanUtils } from '@common/utils/time-span.utils';

@Component({
  selector: 'app-table-row',
  imports: [DatePipe, MatCheckbox],
  templateUrl: './row.component.html',
  styleUrl: './row.component.scss',
})
export class TableRowComponent<TData> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public readonly column = input.required<TableColumnConfig<TData, any>>();
  public readonly row = input.required<TableRow<TData>>();

  public readonly AppTableColumnType = TableColumnType;
  public readonly DateFormat = DateFormat;

  public getTimeSpan(value: TimeSpanModel): string {
    return TimeSpanUtils.ToTimeSpanByModel(value);
  }

  public getPercent(value: number): string {
    return toPercent(value);
  }

  public getPrice(value: number): string {
    return toPrice(value);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getEnumText(column: TableColumnConfig<TData, any>, enumValue: any): string {
    return column.enumDefinition.find((e) => e.value === enumValue)?.text ?? '';
  }
}
