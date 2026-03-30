import { inject, Injectable } from '@angular/core';
import type { QuizzesListItemResponse } from '@app/modules/quizzes/pages/quizzes/api/responses/quizzes-list-Item.response';
import { QuizzesListApiService } from '@app/modules/quizzes/pages/quizzes/api/quizzes-list-api.service';
import type { PaginatedListResponse, PaginationRequest } from 'lp-common';
import { BaseTableApiDataSource } from 'lp-common';

@Injectable()
export class QuizzesDataSourceService extends BaseTableApiDataSource<QuizzesListItemResponse> {
  private readonly _service = inject(QuizzesListApiService);

  protected override getData(
    request: PaginationRequest,
  ): Promise<PaginatedListResponse<QuizzesListItemResponse>> {
    return this._service.getList(request);
  }
}
