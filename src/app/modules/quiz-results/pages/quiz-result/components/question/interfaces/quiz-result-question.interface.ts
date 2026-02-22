import type { QuizQuestionType } from '@app/core/enums/quiz-question-type.enum';
import type { QuizResultDetailsOpenQuestionResponse } from '@app/modules/quiz-results/pages/quiz-result/api/responses/quiz-result-details-open-question.response';
import type { QuizResultDetailsSingleChoiceQuestionResponse } from '@app/modules/quiz-results/pages/quiz-result/api/responses/quiz-result-details-single-choice-question.response';
import type { QuizResultDetailsMultipleChoiceQuestionResponse } from '@app/modules/quiz-results/pages/quiz-result/api/responses/quiz-result-details-multiple-choice-question.response';

export interface IQuizResultQuestion {
  readonly response:
    | QuizResultDetailsOpenQuestionResponse
    | QuizResultDetailsSingleChoiceQuestionResponse
    | QuizResultDetailsMultipleChoiceQuestionResponse;
  readonly type: QuizQuestionType;
}
