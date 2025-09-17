import { QuizDetailsClosedQuestionAnswerResponse } from './quiz-details-closed-question-answer.response';

export interface QuizDetailsClosedQuestionResponse {
  readonly no: number;
  readonly ordinalNumber: number;
  readonly text: string;
  readonly answers: QuizDetailsClosedQuestionAnswerResponse[];
}
