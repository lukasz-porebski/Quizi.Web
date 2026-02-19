import { Injectable } from '@angular/core';
import { BaseApiService } from '@common/services/base-api.service';
import { PaginatedListResponse } from '@common/models/responses/paginated-list.response';
import { PaginationRequest } from '@common/models/requests/pagination.request';
import {
  UsersListItemRawResponse,
  UsersListItemResponse,
} from '@app/modules/users/pages/users/api/responses/users-list-item.response';

@Injectable()
export class UsersListApiService extends BaseApiService {
  public getList(request: PaginationRequest): Promise<PaginatedListResponse<UsersListItemResponse>> {
    return this.get<
      PaginatedListResponse<UsersListItemResponse>,
      PaginatedListResponse<UsersListItemRawResponse>
    >(
      'users/list',
      (response) =>
        new PaginatedListResponse<UsersListItemResponse>({
          items: response.items.map((i) => ({
            ...i,
            createdAt: new Date(i.createdAt),
          })),
          pagination: response.pagination,
          totalCount: response.totalCount,
        }),
      request,
    );
  }
}
