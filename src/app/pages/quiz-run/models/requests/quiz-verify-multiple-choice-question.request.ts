import { QuizVerifyClosedQuestionAnswerRequest } from './quiz-verify-closed-question-answer.request';

export interface QuizVerifyMultipleChoiceQuestionRequest {
  readonly no: number;
  readonly ordinalNumber: number;
  readonly text: string;
  readonly selectedAnswers: QuizVerifyClosedQuestionAnswerRequest[];
  readonly unselectedAnswers: QuizVerifyClosedQuestionAnswerRequest[];
}
