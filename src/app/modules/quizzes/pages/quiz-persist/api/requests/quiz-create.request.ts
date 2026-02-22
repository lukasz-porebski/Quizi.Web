import type { QuizClosedQuestionCreateRequest } from '@app/modules/quizzes/pages/quiz-persist/api/requests/quiz-closed-question-create.request';
import type { QuizOpenQuestionPersistRequest } from '@app/modules/quizzes/pages/quiz-persist/api/requests/quiz-open-question-persist.request';
import type { QuizSettingsPersistRequest } from '@app/modules/quizzes/pages/quiz-persist/api/requests/quiz-settings-persist.request';
import type { Optional } from '@common/types/optional.type';

export interface QuizCreateRequest {
  readonly title: string;
  readonly description: Optional<string>;
  readonly settings: QuizSettingsPersistRequest;
  readonly openQuestions: QuizOpenQuestionPersistRequest[];
  readonly singleChoiceQuestions: QuizClosedQuestionCreateRequest[];
  readonly multipleChoiceQuestions: QuizClosedQuestionCreateRequest[];
}
