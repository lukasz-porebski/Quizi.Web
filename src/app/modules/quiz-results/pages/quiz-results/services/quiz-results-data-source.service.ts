import { inject, Injectable } from '@angular/core';
import type { QuizResultsListItemResponse } from '@app/modules/quiz-results/pages/quiz-results/api/responses/quiz-results-list-item.response';
import { QuizResultsListApiService } from '@app/modules/quiz-results/pages/quiz-results/api/quiz-results-list-api.service';
import type { PaginatedListResponse, PaginationRequest } from '@lukasz-porebski/lp-common';
import { BaseTableApiDataSource } from '@lukasz-porebski/lp-common';

@Injectable()
export class QuizResultsDataSourceService extends BaseTableApiDataSource<QuizResultsListItemResponse> {
  private readonly _service = inject(QuizResultsListApiService);

  protected override getData(
    request: PaginationRequest,
  ): Promise<PaginatedListResponse<QuizResultsListItemResponse>> {
    return this._service.getList(request);
  }
}
