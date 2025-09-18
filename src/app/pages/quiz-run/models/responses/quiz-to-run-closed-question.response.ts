import { QuizToRunClosedQuestionAnswerResponse } from './quiz-to-run-closed-question-answer.response';

export interface QuizToRunClosedQuestionResponse {
  readonly no: number;
  readonly ordinalNumber: number;
  readonly text: string;
  readonly answers: QuizToRunClosedQuestionAnswerResponse[];
}
