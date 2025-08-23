import { TableConfig } from '../../../../../common/components/table/models/table.config';
import { QuizzesListItemResponse } from '../models/quizzes-list-Item.response';
import { QuizzesDataSourceService } from '../services/quizzes-data-source.service';

export namespace QuizzesTableConfigFactory {
  export function Create(
    dataSourceService: QuizzesDataSourceService,
  ): TableConfig<QuizzesListItemResponse> {
    return new TableConfig<QuizzesListItemResponse>({
      dataSource: dataSourceService,
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
    });
  }
}
