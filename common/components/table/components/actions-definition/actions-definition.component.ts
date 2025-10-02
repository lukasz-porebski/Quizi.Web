import { Component, input } from '@angular/core';
import { TableColumnActionsConfig } from '@common/components/table/models/columns/column-actions.config';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { TextConfigTranslatePipe } from '@common/pipes/text-config-translation.pipe';
import { ITableComponent } from '@common/components/table/interfaces/table-component.interface';

@Component({
  selector: 'app-table-actions-definition',
  imports: [MatIconButton, MatIcon, MatMenu, MatMenuItem, MatMenuTrigger, TextConfigTranslatePipe],
  templateUrl: './actions-definition.component.html',
  styleUrls: ['./actions-definition.component.scss', '../../styles/table.shared.scss'],
})
export class TableActionsDefinitionComponent<TData> {
  public tableComponent = input.required<ITableComponent>();
  public actionsDefinition = input.required<TableColumnActionsConfig<TData>>();
  public data = input.required<TData>();
  public shouldShowSpinner = input.required<boolean>();

  public applyBooleanOrCallableColumnValue<T>(
    value: boolean | ((rowValue: Readonly<T>) => boolean),
    data: T,
  ): boolean {
    return typeof value === 'boolean' ? value : value(data);
  }
}
