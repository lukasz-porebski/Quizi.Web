import { Component, inject } from '@angular/core';
import { TableComponent } from '../../../../common/components/table/table.component';
import { QuizzesTableConfigFactory } from './factories/quizzes-table-config.factory';
import { QuizzesListApiService } from './services/quizzes-list-api.service';
import { QuizzesDataSourceService } from './services/quizzes-data-source.service';

@Component({
  selector: 'app-quizzes',
  imports: [TableComponent],
  templateUrl: './quizzes.component.html',
  styleUrl: './quizzes.component.scss',
  providers: [QuizzesListApiService, QuizzesDataSourceService],
})
export class QuizzesComponent {
  private readonly _dataSourceService = inject(QuizzesDataSourceService);

  public config = QuizzesTableConfigFactory.Create(this._dataSourceService);
}
