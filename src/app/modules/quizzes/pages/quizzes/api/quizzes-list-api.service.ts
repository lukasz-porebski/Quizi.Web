import { Injectable } from '@angular/core';
import type {
  QuizzesListItemRawResponse,
  QuizzesListItemResponse,
} from '@app/modules/quizzes/pages/quizzes/api/responses/quizzes-list-Item.response';
import { QuizCopyMode } from '@app/modules/quizzes/pages/quizzes/enums/quiz-copy-mode.enum';
import type { AggregateId, Guid, PaginationRequest } from 'lp-common';
import { BaseApiService, PaginatedListResponse, TimeSpanModel } from 'lp-common';

@Injectable()
export class QuizzesListApiService extends BaseApiService {
  public getList(request: PaginationRequest): Promise<PaginatedListResponse<QuizzesListItemResponse>> {
    return this.get<
      PaginatedListResponse<QuizzesListItemResponse>,
      PaginatedListResponse<QuizzesListItemRawResponse>
    >(
      'quizzes/list',
      (response) =>
        new PaginatedListResponse<QuizzesListItemResponse>({
          items: response.items.map((i) => ({
            ...i,
            duration: TimeSpanModel.CreateByTimeSpan(i.duration),
            copyMode: QuizCopyMode[i.copyMode as keyof typeof QuizCopyMode],
          })),
          pagination: response.pagination,
          totalCount: response.totalCount,
        }),
      request,
    );
  }

  public remove(id: AggregateId): Promise<void> {
    return this.delete(`quizzes/remove/${id}`);
  }

  public copy(code: Guid): Promise<void> {
    return this.post(`quizzes/copy/${code}`);
  }
}
