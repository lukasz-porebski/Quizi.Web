import type { QuizOpenQuestionPersistRequest } from '@app/modules/quizzes/pages/quiz-persist/api/requests/quiz-open-question-persist.request';
import type { QuizSettingsPersistRequest } from '@app/modules/quizzes/pages/quiz-persist/api/requests/quiz-settings-persist.request';
import type { QuizClosedQuestionUpdateRequest } from '@app/modules/quizzes/pages/quiz-persist/api/requests/quiz-closed-question-update.request';
import type { AggregateId, EntityPersistRequest, Optional } from 'lp-common';

export interface QuizUpdateRequest {
  readonly id: AggregateId;
  readonly title: string;
  readonly description: Optional<string>;
  readonly settings: QuizSettingsPersistRequest;
  readonly openQuestions: EntityPersistRequest<QuizOpenQuestionPersistRequest>[];
  readonly singleChoiceQuestions: EntityPersistRequest<QuizClosedQuestionUpdateRequest>[];
  readonly multipleChoiceQuestions: EntityPersistRequest<QuizClosedQuestionUpdateRequest>[];
}
