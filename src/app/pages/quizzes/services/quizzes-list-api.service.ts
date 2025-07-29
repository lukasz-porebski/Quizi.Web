import { Injectable } from '@angular/core';
import { BaseApiService } from '../../../../../common/services/base-api.service';
import { QuizzesListItemResponse } from '../models/quizzes-list-Item.response';
import { PaginatedListResponse } from '../../../../../common/models/responses/paginated-list.response';

@Injectable()
export class QuizzesListApiService extends BaseApiService {
  public getList(): Promise<PaginatedListResponse<QuizzesListItemResponse>> {
    return this.get<PaginatedListResponse<QuizzesListItemResponse>>(
      'quizzes/list',
      (response) =>
        new PaginatedListResponse<QuizzesListItemResponse>(response),
    );
  }
}
