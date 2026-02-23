import { DataSource } from '@angular/cdk/collections';
import type { Observable } from 'rxjs';
import type { PaginationRequest } from '@common/models/requests/pagination.request';
import type { PaginatedListResponse } from '@common/models/responses/paginated-list.response';

export abstract class BaseTableDataSource<T> extends DataSource<T> {
  public abstract get response(): PaginatedListResponse<T>;

  public abstract readonly loading$: Observable<boolean>;

  public abstract fetchData(request: PaginationRequest): void;
}
