import { QuizClosedQuestionCreateRequest } from './quiz-closed-question-create.request';
import { QuizOpenQuestionPersistRequest } from './quiz-open-question-persist.request';
import { QuizSettingsPersistRequest } from './quiz-settings-persist.request';
import { Optional } from '../../../../../../../../common/types/optional.type';

export interface QuizCreateRequest {
  readonly title: string;
  readonly description: Optional<string>;
  readonly settings: QuizSettingsPersistRequest;
  readonly openQuestions: QuizOpenQuestionPersistRequest[];
  readonly singleChoiceQuestions: QuizClosedQuestionCreateRequest[];
  readonly multipleChoiceQuestions: QuizClosedQuestionCreateRequest[];
}
