import { Component, inject } from '@angular/core';
import { TableComponent } from '@common/components/table/table.component';
import { TranslatePipe } from '@ngx-translate/core';
import { UsersListApiService } from '@app/modules/users/pages/users/api/users-list-api.service';
import { UsersDataSourceService } from '@app/modules/users/pages/users/services/users-data-source.service';
import { UsersTableConfigFactory } from '@app/modules/users/pages/users/factories/users-table-config-factory.service';
import { TableConfig } from '@common/components/table/models/table.config';
import { UsersListItemResponse } from '@app/modules/users/pages/users/api/responses/users-list-item.response';

@Component({
  selector: 'app-users',
  imports: [TableComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  providers: [UsersListApiService, UsersDataSourceService, UsersTableConfigFactory, TranslatePipe],
})
export class UsersComponent {
  public config: TableConfig<UsersListItemResponse>;

  private readonly _tableConfigFactory = inject(UsersTableConfigFactory);

  constructor() {
    this.config = this._tableConfigFactory.create();
  }
}
