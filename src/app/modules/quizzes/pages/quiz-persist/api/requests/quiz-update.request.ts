import { QuizOpenQuestionPersistRequest } from '@app/modules/quizzes/pages/quiz-persist/api/requests/quiz-open-question-persist.request';
import { QuizSettingsPersistRequest } from '@app/modules/quizzes/pages/quiz-persist/api/requests/quiz-settings-persist.request';
import { Optional } from '@common/types/optional.type';
import { AggregateId } from '@common/types/aggregate-id.type';
import { EntityPersistRequest } from '@common/models/responses/entity-persist.request';
import { QuizClosedQuestionUpdateRequest } from '@app/modules/quizzes/pages/quiz-persist/api/requests/quiz-closed-question-update.request';

export interface QuizUpdateRequest {
  readonly id: AggregateId;
  readonly title: string;
  readonly description: Optional<string>;
  readonly settings: QuizSettingsPersistRequest;
  readonly openQuestions: EntityPersistRequest<QuizOpenQuestionPersistRequest>[];
  readonly singleChoiceQuestions: EntityPersistRequest<QuizClosedQuestionUpdateRequest>[];
  readonly multipleChoiceQuestions: EntityPersistRequest<QuizClosedQuestionUpdateRequest>[];
}
