import { Injectable } from '@angular/core';
import { BaseApiService } from '../../../../../../../common/services/base-api.service';
import {
  QuizResultsListItemRawResponse,
  QuizResultsListItemResponse,
} from './responses/quiz-results-list-item.response';
import { PaginatedListResponse } from '../../../../../../../common/models/responses/paginated-list.response';
import { PaginationRequest } from '../../../../../../../common/models/requests/pagination.request';
import { TimeSpanModel } from '../../../../../../../common/models/time-span.model';

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
          items: response.items.map((i) => ({
            ...i,
            quizRunningPeriodStart: new Date(i.quizRunningPeriodStart),
            quizRunningPeriodEnd: new Date(i.quizRunningPeriodEnd),
            duration: TimeSpanModel.CreateByTimeSpan(i.duration),
            maxDuration: TimeSpanModel.CreateByTimeSpan(i.maxDuration),
          })),
          pagination: response.pagination,
          totalCount: response.totalCount,
        }),
      request,
    );
  }
}
