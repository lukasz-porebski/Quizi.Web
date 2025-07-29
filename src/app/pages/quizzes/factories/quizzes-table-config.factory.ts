import { TableConfig } from '../../../../../common/components/table/models/table.config';
import { QuizzesListItemResponse } from '../models/quizzes-list-Item.response';
import { QuizCopyMode } from '../enums/quiz-copy-mode.enum';

export namespace QuizzesTableConfigFactory {
  export function Create(): TableConfig<QuizzesListItemResponse> {
    return new TableConfig<QuizzesListItemResponse>({
      dataSource: Promise.resolve([
        new QuizzesListItemResponse({
          id: 'ddss',
          title: 'www',
          copyMode: QuizCopyMode.ForAll,
          duration: '00:00:00',
          questionsCount: 3,
          questionsCountInRunningQuiz: 2,
        }),
      ]),
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
