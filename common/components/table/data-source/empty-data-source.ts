import { BaseTableDataSource } from './base-data-source';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';
import { PaginationResponse } from '../../../models/responses/pagination.response';

export class TableEmptyDataSource<T> extends BaseTableDataSource<T> {
  public get data(): T[] {
    return [];
  }

  public get totalCount(): number {
    return 0;
  }

  public get pagination(): PaginationResponse {
    return new PaginationResponse();
  }

  public readonly loading$: Observable<boolean> = of(false);

  public connect(collectionViewer: CollectionViewer): Observable<T[]> {
    return of([]);
  }

  public disconnect(collectionViewer: CollectionViewer): void {}

  public fetchData(pageNumber: number, pageSize: number): void {}
}
