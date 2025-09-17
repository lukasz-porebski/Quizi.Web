import { QuizOpenQuestionPersistRequest } from './quiz-open-question-persist.request';
import { QuizSettingsPersistRequest } from './quiz-settings-persist.request';
import { Optional } from '../../../../../../common/types/optional.type';
import { AggregateId } from '../../../../../../common/types/aggregate-id.type';
import { EntityPersistRequest } from '../../../../../../common/models/responses/entity-persist.request';
import { QuizClosedQuestionUpdateRequest } from './quiz-closed-question-update.request';

export interface QuizUpdateRequest {
  readonly id: AggregateId;
  readonly title: string;
  readonly description: Optional<string>;
  readonly settings: QuizSettingsPersistRequest;
  readonly openQuestions: EntityPersistRequest<QuizOpenQuestionPersistRequest>[];
  readonly singleChoiceQuestions: EntityPersistRequest<QuizClosedQuestionUpdateRequest>[];
  readonly multipleChoiceQuestions: EntityPersistRequest<QuizClosedQuestionUpdateRequest>[];
}
