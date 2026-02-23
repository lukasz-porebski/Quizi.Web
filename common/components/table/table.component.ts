import type { AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { Component, computed, DestroyRef, inject, input, viewChild } from '@angular/core';
import type { TableConfig } from '@common/components/table/models/table.config';
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
import type { Sort } from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort';
import type { PageEvent } from '@angular/material/paginator';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { TranslatePipe } from '@ngx-translate/core';
import { SelectionModel } from '@angular/cdk/collections';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { isDefined, isEmpty } from '@common/utils/utils';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { TablePaginatorIntl } from '@common/components/table/providers/paginator-intl';
import type { TableRow } from '@common/components/table/models/row.model';
import { TextConfigTranslatePipe } from '@common/pipes/text-config-translation.pipe';
import { TableRowComponent } from '@common/components/table/components/row/row.component';
import { TableRowActionsComponent } from '@common/components/table/components/row-actions/row-actions.component';
import { TableActionsDefinitionComponent } from '@common/components/table/components/actions-definition/actions-definition.component';
import { TableRowInteractionDirective } from '@common/components/table/directives/row-interaction/row-interaction.directive';
import type { BaseTableDataSource } from '@common/components/table/data-source/base-data-source';
import { TableEmptyDataSource } from '@common/components/table/data-source/empty-data-source';
import { TablePaginatorPageSize } from '@common/components/table/enums/paginator-page-size.enum';
import { PaginationRequest } from '@common/models/requests/pagination.request';
import { SortRequest } from '@common/models/requests/sort.request';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';
import type { ITableComponent } from '@common/components/table/interfaces/table-component.interface';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { TableRowInteractionHandler } from '@common/components/table/directives/row-interaction/row-interaction-handler';
import { ViewportService } from '@common/services/viewport.service';

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
    MatProgressSpinner,
    TranslatePipe,
    MatFooterCellDef,
    TextConfigTranslatePipe,
    TableRowComponent,
    TableRowActionsComponent,
    TableActionsDefinitionComponent,
    TableRowInteractionDirective,
    MatSortModule,
    MatIcon,
    MatIconButton,
  ],
  styleUrls: ['./table.component.scss', './styles/table.shared.scss'],
  providers: [
    { provide: MatPaginatorIntl, useClass: TablePaginatorIntl },
    { provide: TableRowInteractionHandler, useExisting: TableComponent },
  ],
})
export class TableComponent<TData>
  implements OnInit, AfterViewInit, ITableComponent, TableRowInteractionHandler<TData>
{
  public readonly config = input.required<TableConfig<TData>>();

  private readonly _searchInput = viewChild<ElementRef>('searchInput');

  private readonly _destroyRef = inject(DestroyRef);
  private readonly _viewportService = inject(ViewportService);

  public get isTableEmpty(): boolean {
    return isEmpty(this.dataSource.response.items);
  }

  public readonly isSelectionEnable = computed(() => isDefined(this.config().selection));
  public readonly isMobile = this._viewportService.isMobile;

  public shouldShowSpinner = false;
  public selection = new SelectionModel<TableRow<TData>>();
  public dataSource: BaseTableDataSource<TableRow<TData>> = new TableEmptyDataSource();

  public ngOnInit(): void {
    this.initDataSource();
  }

  public ngAfterViewInit(): void {
    const inputElement = this._searchInput()?.nativeElement;
    if (!isDefined(inputElement)) {
      return;
    }

    fromEvent<InputEvent>(inputElement, 'input')
      .pipe(
        map((event) => (event.target as HTMLInputElement).value),
        debounceTime(500),
        distinctUntilChanged(),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe((value) =>
        this.dataSource.fetchData(this._currentPagination({ search: value.trim().toLowerCase() })),
      );
  }

  public initDataSource(): void {
    this.dataSource = this.config().dataSource;
    this.dataSource.fetchData(
      new PaginationRequest(1, this.config().paginator?.defaultPageSize ?? TablePaginatorPageSize.Ten),
    );
    this.dataSource.loading$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((value) => {
      this.shouldShowSpinner = value;
    });
  }

  public async refreshDataSource(): Promise<void> {
    this.dataSource.fetchData(this._currentPagination());
  }

  public onRowClick(row: TableRow<TData>): void {
    if (this.isSelectionEnable()) {
      this.selection.toggle(row);
      const selectedRow = this.selection.selected[0] ?? null;
      this.config().selection?.onRowSelect(selectedRow.data);
    }
  }

  public onMouseOver(row: TableRow<TData>): void {
    if (this.isSelectionEnable()) {
      row.hovered = true;
    }
  }

  public onMouseOut(row: TableRow<TData>): void {
    if (this.isSelectionEnable()) {
      row.hovered = false;
    }
  }

  public onPageChange(event: PageEvent): void {
    this.dataSource.fetchData(
      this._currentPagination({ pageNumber: event.pageIndex + 1, pageSize: event.pageSize }),
    );
  }

  public onSortChange(event: Sort): void {
    const sort =
      event.direction !== '' ? new SortRequest(event.active, event.direction === 'asc') : undefined;
    this.dataSource.fetchData(this._currentPagination({ sort }));
  }

  private _currentPagination(
    overrides: Partial<{
      pageNumber: number;
      pageSize: number;
      sort: SortRequest | undefined;
      search: string;
    }> = {},
  ): PaginationRequest {
    const p = this.dataSource.response.pagination;
    const currentSort = p.sort ? new SortRequest(p.sort.columnName, p.sort.isAscending) : undefined;

    const sort = 'sort' in overrides ? overrides.sort : currentSort;

    return new PaginationRequest(
      overrides.pageNumber ?? p.pageNumber,
      overrides.pageSize ?? p.pageSize,
      sort,
      overrides.search ?? p.search,
    );
  }
}
