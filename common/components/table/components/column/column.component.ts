import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
} from '@angular/material/table';
import { TableColumnType } from '../../enums/column-type.enum';
import { DateFormat } from '../../../../enums/date-format.enum';
import { MatSort } from '@angular/material/sort';
import { MatCheckbox } from '@angular/material/checkbox';
import { toPercent, toPrice } from '../../../../utils/utils';
import { TableColumnConfig } from '../../models/columns/column.config';
import { TextConfigTranslatePipe } from '../../../../pipes/text-config-translation.pipe';

@Component({
  selector: 'app-table-column',
  imports: [
    DatePipe,
    MatCell,
    MatHeaderCell,
    MatColumnDef,
    MatHeaderCellDef,
    MatSort,
    MatCellDef,
    MatCheckbox,
    TextConfigTranslatePipe,
  ],
  templateUrl: './column.component.html',
  styleUrl: './column.component.scss',
})
export class TableColumnComponent<TData> {
  public column = input.required<TableColumnConfig<TData, any>>();

  public readonly AppTableColumnType = TableColumnType;
  public readonly DateFormat = DateFormat;

  public getPercent(value: number): string {
    return toPercent(value);
  }

  public getPrice(value: number): string {
    return toPrice(value);
  }

  public getEnumText(
    column: TableColumnConfig<TData, any>,
    enumValue: any,
  ): string {
    return column.enumDefinition.find((e) => e.value === enumValue)?.text ?? '';
  }
}
