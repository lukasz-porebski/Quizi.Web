import { TableConfig } from '@common/components/table/models/table.config';
import { QuizResultsListItemResponse } from '@app/modules/quiz-results/pages/quiz-results/api/responses/quiz-results-list-item.response';
import { QuizResultsDataSourceService } from '@app/modules/quiz-results/pages/quiz-results/services/quiz-results-data-source.service';
import { Icon } from '@common/enums/icon.enum';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Route } from '@app/core/enums/route.enum';

@Injectable()
export class QuizResultsTableConfigFactory {
  private readonly _dataSourceService = inject(QuizResultsDataSourceService);
  private readonly _router = inject(Router);

  public create(): TableConfig<QuizResultsListItemResponse> {
    return new TableConfig<QuizResultsListItemResponse>({
      dataSource: this._dataSourceService,
      paginator: {},
      search: {
        fields: ['title'],
      },
      columns: (builder) =>
        builder
          .addText({
            field: 'title',
            header: {
              text: 'TITLE',
            },
          })
          .addNumber({
            field: 'scoredPoints',
            header: {
              text: 'SCORED_POINTS',
            },
          })
          .addNumber({
            field: 'pointsPossibleToGet',
            header: {
              text: 'POINTS_POSSIBLE_TO_GET',
            },
          })
          .addDateWithTime({
            field: 'quizRunningPeriodStart',
            header: {
              text: 'START_DATE',
            },
          })
          .addDateWithTime({
            field: 'quizRunningPeriodEnd',
            header: {
              text: 'END_DATE',
            },
          })
          .addTimeSpan({
            field: 'duration',
            header: {
              text: 'DURATION',
            },
          })
          .addTimeSpan({
            field: 'maxDuration',
            header: {
              text: 'MAX_DURATION',
            },
          })
          .build(),
      actionsDefinition: {
        actions: [
          {
            name: {
              text: 'PREVIEW',
            },
            icon: Icon.Search,
            onClick: (rowValue): void => {
              this._router.navigateByUrl(`${Route.QuizResult}${rowValue.id}`);
            },
          },
        ],
      },
    });
  }
}
