import { SelectionModel } from '@angular/cdk/collections';
import { TableRow } from '@common/components/table/models/row.model';

export abstract class TableRowInteractionHandler<TData = unknown> {
  abstract selection: SelectionModel<TableRow<TData>>;
  abstract onRowClick(row: TableRow<TData>): void;
  abstract onMouseOver(row: TableRow<TData>): void;
  abstract onMouseOut(row: TableRow<TData>): void;
}
