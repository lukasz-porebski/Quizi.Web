import { TableConfig } from '../../../../../common/components/table/models/table.config';
import { QuizzesListItemResponse } from '../models/quizzes-list-Item.response';

export namespace QuizzesTableConfigFactory {
  export function Create(): TableConfig<QuizzesListItemResponse> {
    return new TableConfig<QuizzesListItemResponse>({
      dataSource: Promise.resolve([]),
      columns: (builder) =>
        builder
          .addText({
            field: 'id',
            header: {
              text: 'Idk',
            },
          })
          .build(),
    });
  }
}
