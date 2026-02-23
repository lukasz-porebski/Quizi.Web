import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { TableActionsDefinitionComponent } from '@common/components/table/components/actions-definition/actions-definition.component';
import type { ITableComponent } from '@common/components/table/interfaces/table-component.interface';
import type { TableColumnWithIconConfig } from '@common/components/table/models/columns/column-with-icon.config';
import type { TableColumnActionsConfig } from '@common/components/table/models/columns/column-actions.config';

@Component({
  selector: 'app-table-row-actions',
  templateUrl: './row-actions.component.html',
  imports: [MatIconButton, MatIcon, TableActionsDefinitionComponent],
})
export class TableRowActionsComponent<TData> {
  public readonly tableComponent = input.required<ITableComponent>();
  public readonly data = input.required<TData>();
  public readonly columnsWithIcon = input<TableColumnWithIconConfig<TData>[]>([]);
  public readonly actionsDefinition = input<TableColumnActionsConfig<TData>>();
  public readonly disabled = input(false);
}
