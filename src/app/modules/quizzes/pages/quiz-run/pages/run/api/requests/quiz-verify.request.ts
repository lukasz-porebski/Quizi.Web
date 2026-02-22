import type { QuizVerifySingleChoiceQuestionRequest } from '@app/modules/quizzes/pages/quiz-run/pages/run/api/requests/quiz-verify-single-choice-question.request';
import type { QuizVerifyOpenQuestionRequest } from '@app/modules/quizzes/pages/quiz-run/pages/run/api/requests/quiz-verify-open-question.request';
import type { PeriodViewModel } from '@common/models/views/period.view-model';
import type { AggregateId } from '@common/types/aggregate-id.type';
import type { QuizVerifyMultipleChoiceQuestionRequest } from '@app/modules/quizzes/pages/quiz-run/pages/run/api/requests/quiz-verify-multiple-choice-question.request';

export interface QuizVerifyRequest {
  readonly quizId: AggregateId;
  readonly quizRunningPeriod: PeriodViewModel<Date>;
  readonly openQuestions: QuizVerifyOpenQuestionRequest[];
  readonly singleChoiceQuestions: QuizVerifySingleChoiceQuestionRequest[];
  readonly multipleChoiceQuestions: QuizVerifyMultipleChoiceQuestionRequest[];
}
