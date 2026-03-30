import type { QuizVerifySingleChoiceQuestionRequest } from '@app/modules/quizzes/pages/quiz-run/pages/run/api/requests/quiz-verify-single-choice-question.request';
import type { QuizVerifyOpenQuestionRequest } from '@app/modules/quizzes/pages/quiz-run/pages/run/api/requests/quiz-verify-open-question.request';
import type { QuizVerifyMultipleChoiceQuestionRequest } from '@app/modules/quizzes/pages/quiz-run/pages/run/api/requests/quiz-verify-multiple-choice-question.request';
import type { AggregateId, PeriodViewModel } from '@lukasz-porebski/lp-common';

export interface QuizVerifyRequest {
  readonly quizId: AggregateId;
  readonly quizRunningPeriod: PeriodViewModel<Date>;
  readonly openQuestions: QuizVerifyOpenQuestionRequest[];
  readonly singleChoiceQuestions: QuizVerifySingleChoiceQuestionRequest[];
  readonly multipleChoiceQuestions: QuizVerifyMultipleChoiceQuestionRequest[];
}
