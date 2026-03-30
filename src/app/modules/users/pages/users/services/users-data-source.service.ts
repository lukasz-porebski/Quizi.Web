import { inject, Injectable } from '@angular/core';
import type { UsersListItemResponse } from '@app/modules/users/pages/users/api/responses/users-list-item.response';
import { UsersListApiService } from '@app/modules/users/pages/users/api/users-list-api.service';
import type { PaginatedListResponse, PaginationRequest } from '@lukasz-porebski/lp-common';
import { BaseTableApiDataSource } from '@lukasz-porebski/lp-common';

@Injectable()
export class UsersDataSourceService extends BaseTableApiDataSource<UsersListItemResponse> {
  private readonly _service = inject(UsersListApiService);

  protected override getData(
    request: PaginationRequest,
  ): Promise<PaginatedListResponse<UsersListItemResponse>> {
    return this._service.getList(request);
  }
}
