import { QuizClosedQuestionAnswerPersistRequest } from '@app/modules/quizzes/pages/quiz-persist/api/requests/quiz-closed-question-answer-persist.request';

export interface QuizClosedQuestionCreateRequest {
  readonly ordinalNumber: number;
  readonly text: string;
  readonly answers: QuizClosedQuestionAnswerPersistRequest[];
}
