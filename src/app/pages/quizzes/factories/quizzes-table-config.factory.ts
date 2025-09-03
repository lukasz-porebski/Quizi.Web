import { TableConfig } from '../../../../../common/components/table/models/table.config';
import { QuizzesListItemResponse } from '../models/quizzes-list-Item.response';
import { QuizzesDataSourceService } from '../services/quizzes-data-source.service';
import { Icon } from '../../../../../common/enums/icon.enum';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Route } from '../../../core/enums/route.enum';

@Injectable()
export class QuizzesTableConfigFactory {
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
            field: 'id',
            header: {
              text: 'Idk',
            },
          })
          .addText({
            field: 'title',
            header: {
              text: 'Tytuł',
            },
          })
          .build(),
      actionsDefinition: {
        actions: [
          {
            name: {
              text: 'edit',
            },
            icon: Icon.Error,
            onClick: (rowValue) => {
              this._router.navigateByUrl(`${Route.QuizEdit}${rowValue.id}`);
            },
          },
        ],
      },
    });
  }
}
