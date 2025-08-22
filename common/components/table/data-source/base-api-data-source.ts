import { CollectionViewer } from '@angular/cdk/collections';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { PaginationRequest } from '../../../models/requests/pagination.request';
import { PaginatedListResponse } from '../../../models/responses/paginated-list.response';
import { BaseTableDataSource } from './base-data-source';
import { TableRow } from '../models/row.model';
import { PaginationResponse } from '../../../models/responses/pagination.response';

export abstract class BaseTableApiDataSource<T> extends BaseTableDataSource<
  TableRow<T>
> {
  public get data(): TableRow<T>[] {
    return this._dataSubject.value.items;
  }

  public get totalCount(): number {
    return this._dataSubject.value.totalCount;
  }

  public get pagination(): PaginationResponse {
    return this._dataSubject.value.pagination;
  }

  public readonly loading$: Observable<boolean>;

  private _dataSubject = new BehaviorSubject<
    PaginatedListResponse<TableRow<T>>
  >(new PaginatedListResponse());
  private _loadingSubject = new BehaviorSubject<boolean>(false);

  public constructor() {
    super();
    this.loading$ = this._loadingSubject.asObservable();
  }

  public connect(
    collectionViewer: CollectionViewer,
  ): Observable<TableRow<T>[]> {
    return this._dataSubject.asObservable().pipe(map((r) => r.items));
  }

  public disconnect(collectionViewer: CollectionViewer): void {
    this._dataSubject.complete();
    this._loadingSubject.complete();
  }

  public fetchData(pageNumber: number, pageSize: number): void {
    this._loadingSubject.next(true);

    this.getData(new PaginationRequest(pageNumber, pageSize))
      .then((response) => {
        this._dataSubject.next(
          new PaginatedListResponse({
            items: response.items.map((i) => new TableRow(i)),
            pagination: response.pagination,
            totalCount: response.totalCount,
          }),
        );
      })
      .finally(() => this._loadingSubject.next(false));
  }

  protected abstract getData(
    request: PaginationRequest,
  ): Promise<PaginatedListResponse<T>>;
}
