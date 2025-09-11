import { Injectable } from '@angular/core';
import { BaseApiService } from '../../../../../common/services/base-api.service';
import { QuizzesListItemResponse } from '../models/quizzes-list-Item.response';
import { PaginatedListResponse } from '../../../../../common/models/responses/paginated-list.response';
import { PaginationRequest } from '../../../../../common/models/requests/pagination.request';

@Injectable()
export class QuizzesListApiService extends BaseApiService {
  public getList(request: PaginationRequest): Promise<PaginatedListResponse<QuizzesListItemResponse>> {
    return this.get<PaginatedListResponse<QuizzesListItemResponse>>(
      'quizzes/list',
      (response) => new PaginatedListResponse<QuizzesListItemResponse>(response),
      request,
    );
  }
}
