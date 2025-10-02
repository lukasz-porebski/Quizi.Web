import { Component, inject } from '@angular/core';
import { TableComponent } from '@common/components/table/table.component';
import { QuizResultsTableConfigFactory } from '@app/modules/quiz-results/pages/quiz-results/factories/quiz-results-table-config-factory.service';
import { QuizResultsListApiService } from '@app/modules/quiz-results/pages/quiz-results/api/quiz-results-list-api.service';
import { QuizResultsDataSourceService } from '@app/modules/quiz-results/pages/quiz-results/services/quiz-results-data-source.service';
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
