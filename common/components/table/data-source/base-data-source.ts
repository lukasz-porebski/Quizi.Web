import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { PaginationResponse } from '../../../models/responses/pagination.response';

export abstract class BaseTableDataSource<T> extends DataSource<T> {
  public abstract get data(): T[];
  public abstract get totalCount(): number;
  public abstract get pagination(): PaginationResponse;

  public abstract readonly loading$: Observable<boolean>;

  public abstract fetchData(pageNumber: number, pageSize: number): void;
}
