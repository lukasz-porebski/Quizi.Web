import type { QuizzesListItemResponse } from '@app/modules/quizzes/pages/quizzes/api/responses/quizzes-list-Item.response';
import { QuizzesDataSourceService } from '@app/modules/quizzes/pages/quizzes/services/quizzes-data-source.service';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Route } from '@app/core/enums/route.enum';
import { QuizzesListApiService } from '@app/modules/quizzes/pages/quizzes/api/quizzes-list-api.service';
import type { ITableColumnActionConfig } from '@lukasz-porebski/lp-common';
import { Icon, NotificationService, TableConfig } from '@lukasz-porebski/lp-common';

@Injectable()
export class QuizzesTableConfigFactory {
  private readonly _apiService = inject(QuizzesListApiService);
  private readonly _dataSourceService = inject(QuizzesDataSourceService);
  private readonly _router = inject(Router);
  private readonly _notificationService = inject(NotificationService);

  public create(): TableConfig<QuizzesListItemResponse> {
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
        actions: this._createActions(),
      },
    });
  }

  private _createActions(): ITableColumnActionConfig<QuizzesListItemResponse>[] {
    return [
      {
        name: {
          text: 'EDIT',
        },
        icon: Icon.Edit,
        onClick: async (rowValue): Promise<void> => {
          await this._router.navigateByUrl(`${Route.QuizEdit}${rowValue.id}`);
        },
      },
      {
        name: {
          text: 'PREVIEW',
        },
        icon: Icon.Search,
        onClick: async (rowValue): Promise<void> => {
          await this._router.navigateByUrl(`${Route.QuizPreview}${rowValue.id}`);
        },
      },
      {
        name: {
          text: 'COPY',
        },
        icon: Icon.Copy,
        onClick: async (rowValue): Promise<void> => {
          await navigator.clipboard.writeText(rowValue.code).then(() => {
            this._notificationService.info('CODE_FOR_COPYING_QUIZ_HAS_BEEN_COPIED');
          });
        },
      },
      {
        name: {
          text: 'START',
        },
        icon: Icon.PowerSettingsNew,
        onClick: async (rowValue): Promise<void> => {
          await this._router.navigateByUrl(`${Route.QuizRun}${rowValue.id}`);
        },
      },
      {
        name: {
          text: 'REMOVE',
        },
        icon: Icon.Delete,
        onClick: async (rowValue, table): Promise<void> => {
          await this._apiService.remove(rowValue.id).then(() => table.refreshDataSource());
        },
      },
    ];
  }
}
