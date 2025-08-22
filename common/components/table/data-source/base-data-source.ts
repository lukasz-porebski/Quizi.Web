import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { PaginationRequest } from '../../../models/requests/pagination.request';
import { PaginatedListResponse } from '../../../models/responses/paginated-list.response';

export abstract class BaseTableDataSource<T> extends DataSource<T> {
  public abstract get response(): PaginatedListResponse<T>;

  public abstract readonly loading$: Observable<boolean>;

  public abstract fetchData(request: PaginationRequest): void;
}
