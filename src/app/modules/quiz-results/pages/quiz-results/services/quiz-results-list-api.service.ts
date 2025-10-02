import { Injectable } from '@angular/core';
import { BaseApiService } from '../../../../../../../common/services/base-api.service';
import {
  QuizResultsListItemRawResponse,
  QuizResultsListItemResponse,
} from '../models/quiz-results-list-item.response';
import { PaginatedListResponse } from '../../../../../../../common/models/responses/paginated-list.response';
import { PaginationRequest } from '../../../../../../../common/models/requests/pagination.request';

@Injectable()
export class QuizResultsListApiService extends BaseApiService {
  public getList(request: PaginationRequest): Promise<PaginatedListResponse<QuizResultsListItemResponse>> {
    return this.get<
      PaginatedListResponse<QuizResultsListItemResponse>,
      PaginatedListResponse<QuizResultsListItemRawResponse>
    >(
      'quiz-results/list',
      (response) =>
        new PaginatedListResponse<QuizResultsListItemResponse>({
          items: response.items.map((i) => new QuizResultsListItemResponse(i)),
          pagination: response.pagination,
          totalCount: response.totalCount,
        }),
      request,
    );
  }
}
