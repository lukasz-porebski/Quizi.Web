import type { QuizClosedQuestionAnswerPersistRequest } from '@app/modules/quizzes/pages/quiz-persist/api/requests/quiz-closed-question-answer-persist.request';
import type { EntityPersistRequest } from '@lukasz-porebski/lp-common';

export interface QuizClosedQuestionUpdateRequest {
  readonly ordinalNumber: number;
  readonly text: string;
  readonly answers: EntityPersistRequest<QuizClosedQuestionAnswerPersistRequest>[];
}
