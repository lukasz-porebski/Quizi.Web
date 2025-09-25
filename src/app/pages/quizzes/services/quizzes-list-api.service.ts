import { Injectable } from '@angular/core';
import { BaseApiService } from '../../../../../common/services/base-api.service';
import { QuizzesListItemRawResponse, QuizzesListItemResponse } from '../models/quizzes-list-Item.response';
import { PaginatedListResponse } from '../../../../../common/models/responses/paginated-list.response';
import { PaginationRequest } from '../../../../../common/models/requests/pagination.request';
import { AggregateId } from '../../../../../common/types/aggregate-id.type';

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
          items: response.items.map((i) => new QuizzesListItemResponse(i)),
          pagination: response.pagination,
          totalCount: response.totalCount,
        }),
      request,
    );
  }

  public remove(id: AggregateId): Promise<void> {
    return this.delete(`quizzes/remove/${id}`);
  }
}
