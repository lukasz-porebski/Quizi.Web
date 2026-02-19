import { Component, inject } from '@angular/core';
import { TableComponent } from '@common/components/table/table.component';
import { TranslatePipe } from '@ngx-translate/core';
import { UsersListApiService } from '@app/modules/users/pages/users/api/users-list-api.service';
import { UsersDataSourceService } from '@app/modules/users/pages/users/services/users-data-source.service';
import { UsersTableConfigFactory } from '@app/modules/users/pages/users/factories/users-table-config-factory.service';

@Component({
  selector: 'app-users',
  imports: [TableComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  providers: [UsersListApiService, UsersDataSourceService, UsersTableConfigFactory, TranslatePipe],
})
export class UsersComponent {
  private readonly _tableConfigFactory = inject(UsersTableConfigFactory);

  public config = this._tableConfigFactory.Create();
}
