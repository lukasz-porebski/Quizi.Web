import { QuizVerifyClosedQuestionAnswerRequest } from '@app/modules/quizzes/pages/quiz-run/pages/run/api/requests/quiz-verify-closed-question-answer.request';

export interface QuizVerifySingleChoiceQuestionRequest {
  readonly no: number;
  readonly ordinalNumber: number;
  readonly selectedAnswer?: QuizVerifyClosedQuestionAnswerRequest;
  readonly unselectedAnswers: QuizVerifyClosedQuestionAnswerRequest[];
}
