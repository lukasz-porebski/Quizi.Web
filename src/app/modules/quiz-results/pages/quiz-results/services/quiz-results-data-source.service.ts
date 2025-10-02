import { inject, Injectable } from '@angular/core';
import { QuizResultsListItemResponse } from '@app/modules/quiz-results/pages/quiz-results/api/responses/quiz-results-list-item.response';
import { PaginatedListResponse } from '@common/models/responses/paginated-list.response';
import { BaseTableApiDataSource } from '@common/components/table/data-source/base-api-data-source';
import { PaginationRequest } from '@common/models/requests/pagination.request';
import { QuizResultsListApiService } from '@app/modules/quiz-results/pages/quiz-results/api/quiz-results-list-api.service';

@Injectable()
export class QuizResultsDataSourceService extends BaseTableApiDataSource<QuizResultsListItemResponse> {
  private readonly _service = inject(QuizResultsListApiService);

  protected override getData(
    request: PaginationRequest,
  ): Promise<PaginatedListResponse<QuizResultsListItemResponse>> {
    return this._service.getList(request);
  }
}
