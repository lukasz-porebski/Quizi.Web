import { inject, Injectable } from '@angular/core';
import type { PaginatedListResponse } from '@common/models/responses/paginated-list.response';
import { BaseTableApiDataSource } from '@common/components/table/data-source/base-api-data-source';
import type { PaginationRequest } from '@common/models/requests/pagination.request';
import type { UsersListItemResponse } from '@app/modules/users/pages/users/api/responses/users-list-item.response';
import { UsersListApiService } from '@app/modules/users/pages/users/api/users-list-api.service';

@Injectable()
export class UsersDataSourceService extends BaseTableApiDataSource<UsersListItemResponse> {
  private readonly _service = inject(UsersListApiService);

  protected override getData(
    request: PaginationRequest,
  ): Promise<PaginatedListResponse<UsersListItemResponse>> {
    return this._service.getList(request);
  }
}
