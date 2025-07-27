import { Component, input, OnInit, viewChild } from '@angular/core';
import { TableConfig } from './models/table.config';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatFooterCell,
  MatFooterCellDef,
  MatFooterRow,
  MatFooterRowDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { TranslatePipe } from '@ngx-translate/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { isDefined, isEmpty } from '../../utils/utils';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { TablePaginatorIntl } from './providers/paginator-intl';
import { TableRow } from './models/row.model';
import { TableActionsDefinitionComponent } from './components/actions-definition/actions-definition.component';
import { TextConfigTranslatePipe } from '../../pipes/text-config-translation.pipe';
import { TableRowComponent } from './components/row/row.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  imports: [
    MatFormField,
    MatInput,
    MatTable,
    MatSort,
    MatLabel,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatFooterCell,
    MatRow,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatFooterRow,
    MatFooterRowDef,
    MatPaginator,
    MatCellDef,
    MatIcon,
    MatIconButton,
    TranslatePipe,
    MatFooterCellDef,
    MatProgressSpinner,
    TableActionsDefinitionComponent,
    TextConfigTranslatePipe,
    TableRowComponent,
  ],
  styleUrls: ['./table.component.scss', './styles/table.shared.scss'],
  providers: [{ provide: MatPaginatorIntl, useClass: TablePaginatorIntl }],
})
export class TableComponent<TData> implements OnInit {
  public matSort = viewChild<MatSort>(MatSort);
  public matPaginator = viewChild<MatPaginator>(MatPaginator);

  public config = input.required<TableConfig<TData>>();

  public get shouldShowSpinner(): boolean {
    return this._spinner;
  }

  public get isTableEmpty(): boolean {
    return isDefined(this.dataSource) && isEmpty(this.dataSource.data);
  }

  public get isSelectionEnable(): boolean {
    return isDefined(this.config().selection);
  }

  public selection = new SelectionModel<TableRow<TData>>();
  public dataSource = new MatTableDataSource<TableRow<TData>>([]);

  private _spinner = false;

  public ngOnInit(): void {
    this.refreshDataSource();
  }

  public async refreshDataSource(): Promise<void> {
    this._spinner = true;

    const dataSource = (await this.config().dataSource).map(
      (d) => new TableRow(d),
    );
    this.dataSource.data = dataSource;
    this.dataSource.sort = this.matSort() ?? null;
    if (isDefined(this.matPaginator())) {
      this.dataSource.paginator = this.matPaginator()!;
    }
    const initialSelectionValue = isDefined(
      this.config().selection?.initialSelection,
    )
      ? [
          this.config().selection!.initialSelection!(
            dataSource.map((d) => d.data),
          ),
        ]
      : [];
    this.selection = new SelectionModel<TableRow<TData>>(
      false,
      initialSelectionValue.map((d) => new TableRow(d)),
    );
    this._spinner = false;
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public onRowClick(row: TableRow<TData>): void {
    if (this.isSelectionEnable) {
      this.selection.toggle(row);
      const selectedRow = isEmpty(this.selection.selected)
        ? null
        : this.selection.selected[0];
      this.config().selection?.onRowSelect(selectedRow?.data);
    }
  }

  public onMouseOver(row: TableRow<TData>): void {
    if (this.isSelectionEnable) {
      row.hovered = true;
    }
  }

  public onMouseOut(row: TableRow<TData>): void {
    if (this.isSelectionEnable) {
      row.hovered = false;
    }
  }
}
