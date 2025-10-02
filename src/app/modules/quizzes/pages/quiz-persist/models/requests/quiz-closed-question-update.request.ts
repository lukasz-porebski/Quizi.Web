import { QuizClosedQuestionAnswerPersistRequest } from './quiz-closed-question-answer-persist.request';
import { EntityPersistRequest } from '../../../../../../../../common/models/responses/entity-persist.request';

export interface QuizClosedQuestionUpdateRequest {
  readonly ordinalNumber: number;
  readonly text: string;
  readonly answers: EntityPersistRequest<QuizClosedQuestionAnswerPersistRequest>[];
}
