import { TableConfig } from '../../../../../../../common/components/table/models/table.config';
import { QuizzesListItemResponse } from '../api/responses/quizzes-list-Item.response';
import { QuizzesDataSourceService } from '../services/quizzes-data-source.service';
import { Icon } from '../../../../../../../common/enums/icon.enum';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Route } from '../../../../../core/enums/route.enum';
import { QuizzesListApiService } from '../api/quizzes-list-api.service';

@Injectable()
export class QuizzesTableConfigFactory {
  private readonly _apiService = inject(QuizzesListApiService);
  private readonly _dataSourceService = inject(QuizzesDataSourceService);
  private readonly _router = inject(Router);

  public Create(): TableConfig<QuizzesListItemResponse> {
    return new TableConfig<QuizzesListItemResponse>({
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
          .addTimeSpan({
            field: 'duration',
            header: {
              text: 'DURATION',
            },
          })
          .addNumber({
            field: 'questionsCount',
            header: {
              text: 'QUESTIONS_COUNT',
            },
          })
          .addNumber({
            field: 'questionsCountInRunningQuiz',
            header: {
              text: 'QUESTIONS_COUNT_IN_RUNNING_QUIZ',
            },
          })
          .build(),
      actionsDefinition: {
        actions: [
          {
            name: {
              text: 'EDIT',
            },
            icon: Icon.Edit,
            onClick: (rowValue) => {
              this._router.navigateByUrl(`${Route.QuizEdit}${rowValue.id}`);
            },
          },
          {
            name: {
              text: 'PREVIEW',
            },
            icon: Icon.Search,
            onClick: (rowValue) => {
              this._router.navigateByUrl(`${Route.QuizPreview}${rowValue.id}`);
            },
          },
          {
            name: {
              text: 'START',
            },
            icon: Icon.PowerSettingsNew,
            onClick: (rowValue) => {
              this._router.navigateByUrl(`${Route.QuizRun}${rowValue.id}`);
            },
          },
          {
            name: {
              text: 'REMOVE',
            },
            icon: Icon.Delete,
            onClick: (rowValue, table) => {
              this._apiService.remove(rowValue.id).then(() => table.refreshDataSource());
            },
          },
        ],
      },
    });
  }
}
