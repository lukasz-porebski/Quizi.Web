import { Component, inject } from '@angular/core';
import { TableComponent } from '../../../../../../common/components/table/table.component';
import { QuizResultsTableConfigFactory } from './factories/quiz-results-table-config-factory.service';
import { QuizResultsListApiService } from './services/quiz-results-list-api.service';
import { QuizResultsDataSourceService } from './services/quiz-results-data-source.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-quiz-results',
  imports: [TableComponent],
  templateUrl: './quiz-results.component.html',
  styleUrl: './quiz-results.component.scss',
  providers: [
    QuizResultsListApiService,
    QuizResultsDataSourceService,
    QuizResultsTableConfigFactory,
    TranslatePipe,
  ],
})
export class QuizResultsComponent {
  private readonly _tableConfigFactory = inject(QuizResultsTableConfigFactory);

  public config = this._tableConfigFactory.Create();
}
