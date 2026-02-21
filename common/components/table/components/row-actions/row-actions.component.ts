import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { TableActionsDefinitionComponent } from '@common/components/table/components/actions-definition/actions-definition.component';
import { ITableComponent } from '@common/components/table/interfaces/table-component.interface';
import { TableColumnWithIconConfig } from '@common/components/table/models/columns/column-with-icon.config';
import { TableColumnActionsConfig } from '@common/components/table/models/columns/column-actions.config';

@Component({
  selector: 'app-table-row-actions',
  templateUrl: './row-actions.component.html',
  imports: [MatIconButton, MatIcon, TableActionsDefinitionComponent],
})
export class TableRowActionsComponent<TData> {
  public tableComponent = input.required<ITableComponent>();
  public data = input.required<TData>();
  public columnsWithIcon = input<TableColumnWithIconConfig<TData>[]>([]);
  public actionsDefinition = input<TableColumnActionsConfig<TData>>();
  public disabled = input(false);
}
