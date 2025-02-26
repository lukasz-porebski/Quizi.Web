import { AfterViewInit, Component, inject, input, OnInit, viewChild } from '@angular/core';
import { TableConfig } from './models/table.config';
import { MatCell, MatCellDef, MatColumnDef, MatFooterCell, MatFooterCellDef, MatFooterRow, MatFooterRowDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatTableDataSource } from '@angular/material/table';
import { TableColumnType } from './enums/column-type.enum';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { SelectionModel } from '@angular/cdk/collections';
import { TableColumnConfig } from './models/columns/column.config';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { TextConfigTranslatePipe } from '../../pipes/text-config-translation.pipe';
import { DatePipe } from '@angular/common';
import { isDefined, isEmpty, toPercent, toPrice } from '../../utils/utils';
import { DateFormat } from '../../enums/date-format.enum';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

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
    TextConfigTranslatePipe,
    MatCellDef,
    DatePipe,
    MatCheckbox,
    MatIcon,
    MatIconButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    TranslatePipe,
    MatFooterCellDef,
    MatProgressSpinner,
  ],
  styleUrls: [ './table.component.scss' ]
})
export class TableComponent implements OnInit, AfterViewInit {
  public matSort = viewChild<MatSort>(MatSort);
  public matPaginator = viewChild<MatPaginator>(MatPaginator);

  public config = input.required<TableConfig<any>>();

  public get shouldShowSpinner(): boolean {
    return this._spinner;
  }

  public get isTableEmpty(): boolean {
    return isDefined(this.dataSource) && isEmpty(this.dataSource.data);
  }

  public get isSelectionEnable(): boolean {
    return isDefined(this.config().selection);
  }

  public readonly AppTableColumnType = TableColumnType;
  public readonly DateFormat = DateFormat;

  public selection = new SelectionModel<any>();
  public dataSource = new MatTableDataSource<any>();

  private readonly _translateService = inject(TranslateService);

  private _spinner = false;

  public ngOnInit(): void {
    this.refreshDataSource()
  }

  public ngAfterViewInit(): void {

  }

  public async refreshDataSource(): Promise<void> {
    this._spinner = true;

    const dataSource = await this.config().dataSource;
    this.dataSource.data = dataSource;
    this.dataSource.sort = this.matSort() ?? null;
    const itemsPerPageLabel = this._translateService.instant('ITEMS_PER_PAGE_LABEL');
    if (isDefined(this.matPaginator())) {
      this.dataSource.paginator = this.matPaginator()!;
      this.matPaginator()!._intl.itemsPerPageLabel = itemsPerPageLabel;
    }
    const initialSelectionValue = isDefined(this.config().selection?.initialSelection)
      ? [ this.config().selection!.initialSelection!(dataSource) ]
      : [];
    this.selection = new SelectionModel<any>(false, initialSelectionValue);
    this._spinner = false;
  }

  public showSpinner(): void {
    this._spinner = true;
  }

  public getPercent(value: number): string {
    return toPercent(value);
  }

  public getPrice(value: number): string {
    return toPrice(value);
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public applyBooleanOrCallableColumnValue<T>(
    value: boolean | ((rowValue: Readonly<T>) => boolean),
    data: T): boolean {
    return typeof value === 'boolean' ? value : value(data);
  }

  public onRowClick(row: any): void {
    if (this.isSelectionEnable) {
      this.selection.toggle(row);
      const selectedRow = isEmpty(this.selection.selected) ? null : this.selection.selected[0];
      this.config().selection?.onRowSelect(selectedRow);
    }
  }

  public onMouseOver(row: any): void {
    if (this.isSelectionEnable) {
      (row as any).hovered = true;
    }
  }

  public onMouseOut(row: any): void {
    if (this.isSelectionEnable) {
      (row as any).hovered = false;
    }
  }

  public getEnumText(column: TableColumnConfig<any, any>, enumValue: any): string {
    return column.enumDefinition.find(e => e.value === enumValue)?.text ?? '';
  }
}
