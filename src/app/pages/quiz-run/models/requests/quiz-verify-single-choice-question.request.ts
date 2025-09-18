import { QuizVerifyClosedQuestionAnswerRequest } from './quiz-verify-closed-question-answer.request';

export interface QuizVerifySingleChoiceQuestionRequest {
  readonly no: number;
  readonly ordinalNumber: number;
  readonly text: string;
  readonly selectedAnswer?: QuizVerifyClosedQuestionAnswerRequest;
  readonly unselectedAnswers: QuizVerifyClosedQuestionAnswerRequest[];
}
