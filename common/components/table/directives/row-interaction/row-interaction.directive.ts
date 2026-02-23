import { computed, Directive, inject, input } from '@angular/core';
import type { TableRow } from '@common/components/table/models/row.model';
import { TableRowInteractionHandler } from '@common/components/table/directives/row-interaction/row-interaction-handler';

@Directive({
  selector: '[appTableRowInteraction]',
  host: {
    '[class.mark-row]': 'markRow()',
    '[class.hovered]': 'row().hovered',
    '[class.highlighted]': 'highlighted()',
    '(click)': 'handler.onRowClick(row())',
    '(mouseover)': 'handler.onMouseOver(row())',
    '(mouseout)': 'handler.onMouseOut(row())',
  },
})
export class TableRowInteractionDirective<TData> {
  public readonly row = input.required<TableRow<TData>>();
  public readonly markRowCondition = input<(data: TData) => boolean>(() => false);
  public readonly markRow = computed(() => this.markRowCondition()(this.row().data));
  public readonly highlighted = computed(() => this.handler.selection.isSelected(this.row()));

  public readonly handler = inject(TableRowInteractionHandler) as TableRowInteractionHandler<TData>;
}
