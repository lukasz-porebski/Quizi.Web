import { TableConfig } from '@common/components/table/models/table.config';
import { inject, Injectable } from '@angular/core';
import { UsersDataSourceService } from '@app/modules/users/pages/users/services/users-data-source.service';
import type { UsersListItemResponse } from '@app/modules/users/pages/users/api/responses/users-list-item.response';

@Injectable()
export class UsersTableConfigFactory {
  private readonly _dataSourceService = inject(UsersDataSourceService);

  public create(): TableConfig<UsersListItemResponse> {
    return new TableConfig<UsersListItemResponse>({
      dataSource: this._dataSourceService,
      paginator: {},
      search: {
        fields: ['email'],
      },
      columns: (builder) =>
        builder
          .addText({
            field: 'email',
            header: {
              text: 'EMAIL',
            },
          })
          .addDateWithTime({
            field: 'createdAt',
            header: {
              text: 'CREATED',
            },
          })
          .build(),
    });
  }
}
