import { CollectionViewer } from '@angular/cdk/collections';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { PaginationRequest } from '../../../models/requests/pagination.request';
import { PaginatedListResponse } from '../../../models/responses/paginated-list.response';
import { BaseTableDataSource } from './base-data-source';
import { TableRow } from '../models/row.model';

export abstract class BaseTableApiDataSource<T> extends BaseTableDataSource<
  TableRow<T>
> {
  public get response(): PaginatedListResponse<TableRow<T>> {
    return this._dataSubject.value;
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

  public fetchData(request: PaginationRequest): void {
    this._loadingSubject.next(true);

    this.getData(request)
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
