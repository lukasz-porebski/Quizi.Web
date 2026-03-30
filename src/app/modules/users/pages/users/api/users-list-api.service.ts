import { Injectable } from '@angular/core';
import type {
  UsersListItemRawResponse,
  UsersListItemResponse,
} from '@app/modules/users/pages/users/api/responses/users-list-item.response';
import type { PaginationRequest } from 'lp-common';
import { BaseApiService, PaginatedListResponse } from 'lp-common';

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
