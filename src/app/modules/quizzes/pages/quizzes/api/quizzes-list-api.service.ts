import { Injectable } from '@angular/core';
import { BaseApiService } from '@common/services/base-api.service';
import {
  QuizzesListItemRawResponse,
  QuizzesListItemResponse,
} from '@app/modules/quizzes/pages/quizzes/api/responses/quizzes-list-Item.response';
import { PaginatedListResponse } from '@common/models/responses/paginated-list.response';
import { PaginationRequest } from '@common/models/requests/pagination.request';
import { AggregateId } from '@common/types/aggregate-id.type';
import { TimeSpanModel } from '@common/models/time-span.model';
import { QuizCopyMode } from '@app/modules/quizzes/pages/quizzes/enums/quiz-copy-mode.enum';
import { Guid } from '@common/types/guid.type';

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
