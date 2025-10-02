import { QuizClosedQuestionAnswerPersistRequest } from './quiz-closed-question-answer-persist.request';

export interface QuizClosedQuestionCreateRequest {
  readonly ordinalNumber: number;
  readonly text: string;
  readonly answers: QuizClosedQuestionAnswerPersistRequest[];
}
