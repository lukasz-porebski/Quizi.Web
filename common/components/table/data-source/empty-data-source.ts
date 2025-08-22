import { BaseTableDataSource } from './base-data-source';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';
import { PaginationRequest } from '../../../models/requests/pagination.request';
import { PaginatedListResponse } from '../../../models/responses/paginated-list.response';

export class TableEmptyDataSource<T> extends BaseTableDataSource<T> {
  public override get response(): PaginatedListResponse<T> {
    return new PaginatedListResponse<T>();
  }

  public readonly loading$: Observable<boolean> = of(false);

  public connect(collectionViewer: CollectionViewer): Observable<T[]> {
    return of([]);
  }

  public disconnect(collectionViewer: CollectionViewer): void {}

  public fetchData(request: PaginationRequest): void {}
}
