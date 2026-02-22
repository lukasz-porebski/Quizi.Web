import { Component, inject } from '@angular/core';
import { TableComponent } from '@common/components/table/table.component';
import { QuizResultsTableConfigFactory } from '@app/modules/quiz-results/pages/quiz-results/factories/quiz-results-table-config-factory.service';
import { QuizResultsListApiService } from '@app/modules/quiz-results/pages/quiz-results/api/quiz-results-list-api.service';
import { QuizResultsDataSourceService } from '@app/modules/quiz-results/pages/quiz-results/services/quiz-results-data-source.service';
import { TranslatePipe } from '@ngx-translate/core';
import { QuizResultsListItemResponse } from '@app/modules/quiz-results/pages/quiz-results/api/responses/quiz-results-list-item.response';
import { TableConfig } from '@common/components/table/models/table.config';

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
  public config: TableConfig<QuizResultsListItemResponse>;

  private readonly _tableConfigFactory = inject(QuizResultsTableConfigFactory);

  constructor() {
    this.config = this._tableConfigFactory.create();
  }
}
