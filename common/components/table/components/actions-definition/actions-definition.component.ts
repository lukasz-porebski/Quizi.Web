import { Component, input } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
} from '@angular/material/table';
import { TableColumnActionsConfig } from '../../models/columns/column-actions.config';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { TextConfigTranslatePipe } from '../../../../pipes/text-config-translation.pipe';

@Component({
  selector: 'app-table-actions-definition',
  imports: [
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatIconButton,
    MatHeaderCellDef,
    MatCellDef,
    MatIcon,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    TextConfigTranslatePipe,
  ],
  templateUrl: './actions-definition.component.html',
  styleUrls: [
    './actions-definition.component.scss',
    '../../styles/table.shared.scss',
  ],
})
export class TableActionsDefinitionComponent<TData> {
  public actionsDefinition = input.required<TableColumnActionsConfig<TData>>();
  public shouldShowSpinner = input.required<boolean>();

  public applyBooleanOrCallableColumnValue<T>(
    value: boolean | ((rowValue: Readonly<T>) => boolean),
    data: T,
  ): boolean {
    return typeof value === 'boolean' ? value : value(data);
  }
}
