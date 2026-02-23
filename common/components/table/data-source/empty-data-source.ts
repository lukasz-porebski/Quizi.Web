import { BaseTableDataSource } from '@common/components/table/data-source/base-data-source';
import type { CollectionViewer } from '@angular/cdk/collections';
import type { Observable } from 'rxjs';
import { of } from 'rxjs';
import type { PaginationRequest } from '@common/models/requests/pagination.request';
import { PaginatedListResponse } from '@common/models/responses/paginated-list.response';

export class TableEmptyDataSource<T> extends BaseTableDataSource<T> {
  public override get response(): PaginatedListResponse<T> {
    return new PaginatedListResponse<T>();
  }

  public readonly loading$: Observable<boolean> = of(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public connect(collectionViewer: CollectionViewer): Observable<T[]> {
    return of([]);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public disconnect(collectionViewer: CollectionViewer): void {
    /* empty */
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public fetchData(request: PaginationRequest): void {
    /* empty */
  }
}
