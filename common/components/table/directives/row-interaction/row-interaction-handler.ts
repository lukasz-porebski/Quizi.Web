import type { SelectionModel } from '@angular/cdk/collections';
import type { TableRow } from '@common/components/table/models/row.model';

export abstract class TableRowInteractionHandler<TData = unknown> {
  public abstract selection: SelectionModel<TableRow<TData>>;
  public abstract onRowClick(row: TableRow<TData>): void;
  public abstract onMouseOver(row: TableRow<TData>): void;
  public abstract onMouseOut(row: TableRow<TData>): void;
}
