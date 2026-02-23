import type { CollectionViewer } from '@angular/cdk/collections';
import type { Observable } from 'rxjs';
import { BehaviorSubject, map } from 'rxjs';
import type { PaginationRequest } from '@common/models/requests/pagination.request';
import { PaginatedListResponse } from '@common/models/responses/paginated-list.response';
import { BaseTableDataSource } from '@common/components/table/data-source/base-data-source';
import { TableRow } from '@common/components/table/models/row.model';

export abstract class BaseTableApiDataSource<T> extends BaseTableDataSource<TableRow<T>> {
  public get response(): PaginatedListResponse<TableRow<T>> {
    return this._dataSubject.value;
  }

  public readonly loading$: Observable<boolean>;

  private readonly _dataSubject = new BehaviorSubject<PaginatedListResponse<TableRow<T>>>(
    new PaginatedListResponse(),
  );
  private readonly _loadingSubject = new BehaviorSubject<boolean>(false);

  constructor() {
    super();
    this.loading$ = this._loadingSubject.asObservable();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public connect(collectionViewer: CollectionViewer): Observable<TableRow<T>[]> {
    return this._dataSubject.asObservable().pipe(map((r) => r.items));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public disconnect(collectionViewer: CollectionViewer): void {
    this._dataSubject.complete();
    this._loadingSubject.complete();
  }

  public async fetchData(request: PaginationRequest): Promise<void> {
    this._loadingSubject.next(true);

    await this.getData(request)
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

  protected abstract getData(request: PaginationRequest): Promise<PaginatedListResponse<T>>;
}
