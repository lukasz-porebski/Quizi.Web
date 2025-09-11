import { AfterViewInit, Component, ElementRef, input, OnInit, viewChild } from '@angular/core';
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
} from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
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
import { TextConfigTranslatePipe } from '../../pipes/text-config-translation.pipe';
import { TableRowComponent } from './components/row/row.component';
import { BaseTableDataSource } from './data-source/base-data-source';
import { TableEmptyDataSource } from './data-source/empty-data-source';
import { TablePaginatorPageSize } from './enums/paginator-page-size.enum';
import { PaginationRequest } from '../../models/requests/pagination.request';
import { SortRequest } from '../../models/requests/sort.request';
import { Optional } from '../../types/optional.type';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';
import { TableActionsDefinitionComponent } from './components/actions-definition/actions-definition.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  imports: [
    MatFormField,
    MatInput,
    MatTable,
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
    TextConfigTranslatePipe,
    TableRowComponent,
    MatSortModule,
    TableActionsDefinitionComponent,
  ],
  styleUrls: ['./table.component.scss', './styles/table.shared.scss'],
  providers: [{ provide: MatPaginatorIntl, useClass: TablePaginatorIntl }],
})
export class TableComponent<TData> implements OnInit, AfterViewInit {
  public searchInput = viewChild<ElementRef>('searchInput');

  public config = input.required<TableConfig<TData>>();

  public get shouldShowSpinner(): boolean {
    return this._spinner;
  }

  public get isTableEmpty(): boolean {
    return isDefined(this.dataSource) && isEmpty(this.dataSource.response.items);
  }

  public get isSelectionEnable(): boolean {
    return isDefined(this.config().selection);
  }

  public selection = new SelectionModel<TableRow<TData>>();
  public dataSource: BaseTableDataSource<TableRow<TData>> = new TableEmptyDataSource();

  private _spinner = false;

  public ngOnInit(): void {
    this.initDataSource();
  }

  public ngAfterViewInit(): void {
    if (!isDefined(this.searchInput()?.nativeElement)) {
      return;
    }

    fromEvent(this.searchInput()?.nativeElement, 'input')
      .pipe(
        map((event: any) => event.data),
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe((value) => this._applySearch(value));
  }

  public async initDataSource(): Promise<void> {
    this.dataSource = this.config().dataSource;
    this.dataSource.fetchData(
      new PaginationRequest(1, this.config().paginator?.defaultPageSize ?? TablePaginatorPageSize.Ten),
    );
    this.dataSource.loading$.subscribe((value) => {
      this._spinner = value;
    });
  }

  // public async refreshDataSource(): Promise<void> {
  //   this._spinner = true;
  //
  //   this.dataSource = this.config().dataSource;
  //   const initialSelectionValue = isDefined(
  //     this.config().selection?.initialSelection,
  //   )
  //     ? [
  //         this.config().selection!.initialSelection!(
  //           dataSource.map((d) => d.data),
  //         ),
  //       ]
  //     : [];
  //   this.selection = new SelectionModel<TableRow<TData>>(
  //     false,
  //     initialSelectionValue.map((d) => new TableRow(d)),
  //   );
  //   this._spinner = false;
  // }

  public onRowClick(row: TableRow<TData>): void {
    if (this.isSelectionEnable) {
      this.selection.toggle(row);
      const selectedRow = isEmpty(this.selection.selected) ? null : this.selection.selected[0];
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

  public onPageChange(event: PageEvent): void {
    this.dataSource.fetchData(
      new PaginationRequest(
        event.pageIndex + 1,
        event.pageSize,
        isDefined(this.dataSource.response.pagination.sort)
          ? new SortRequest(
              this.dataSource.response.pagination.sort.columnName,
              this.dataSource.response.pagination.sort.isAscending,
            )
          : undefined,
        this.dataSource.response.pagination.search,
      ),
    );
  }

  public onSortChange(event: Sort): void {
    let sort: Optional<SortRequest> = undefined;
    if (event.direction !== '') {
      sort = new SortRequest(event.active, event.direction === 'asc');
    }

    this.dataSource.fetchData(
      new PaginationRequest(
        this.dataSource.response.pagination.pageNumber,
        this.dataSource.response.pagination.pageSize,
        sort,
        this.dataSource.response.pagination.search,
      ),
    );
  }

  private _applySearch(value: string): void {
    this.dataSource.fetchData(
      new PaginationRequest(
        this.dataSource.response.pagination.pageNumber,
        this.dataSource.response.pagination.pageSize,
        isDefined(this.dataSource.response.pagination.sort)
          ? new SortRequest(
              this.dataSource.response.pagination.sort.columnName,
              this.dataSource.response.pagination.sort.isAscending,
            )
          : undefined,
        (value ?? '').trim().toLowerCase(),
      ),
    );
  }
}
