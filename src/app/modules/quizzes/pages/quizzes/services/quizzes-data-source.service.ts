import { inject, Injectable } from '@angular/core';
import { QuizzesListItemResponse } from '@app/modules/quizzes/pages/quizzes/api/responses/quizzes-list-Item.response';
import { PaginatedListResponse } from '@common/models/responses/paginated-list.response';
import { BaseTableApiDataSource } from '@common/components/table/data-source/base-api-data-source';
import { PaginationRequest } from '@common/models/requests/pagination.request';
import { QuizzesListApiService } from '@app/modules/quizzes/pages/quizzes/api/quizzes-list-api.service';

@Injectable()
export class QuizzesDataSourceService extends BaseTableApiDataSource<QuizzesListItemResponse> {
  private readonly _service = inject(QuizzesListApiService);

  protected override getData(
    request: PaginationRequest,
  ): Promise<PaginatedListResponse<QuizzesListItemResponse>> {
    return this._service.getList(request);
  }
}
