import { inject, Injectable } from '@angular/core';
import { QuizzesListItemResponse } from '../models/quizzes-list-Item.response';
import { PaginatedListResponse } from '../../../../../common/models/responses/paginated-list.response';
import { BaseTableApiDataSource } from '../../../../../common/components/table/data-source/base-api-data-source';
import { PaginationRequest } from '../../../../../common/models/requests/pagination.request';
import { QuizzesListApiService } from './quizzes-list-api.service';

@Injectable()
export class QuizzesDataSourceService extends BaseTableApiDataSource<QuizzesListItemResponse> {
  private readonly _service = inject(QuizzesListApiService);

  protected override getData(
    request: PaginationRequest,
  ): Promise<PaginatedListResponse<QuizzesListItemResponse>> {
    return this._service.getList(request);
  }
}
