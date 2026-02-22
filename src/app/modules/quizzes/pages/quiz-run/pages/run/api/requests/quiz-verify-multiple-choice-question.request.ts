import type { QuizVerifyClosedQuestionAnswerRequest } from '@app/modules/quizzes/pages/quiz-run/pages/run/api/requests/quiz-verify-closed-question-answer.request';

export interface QuizVerifyMultipleChoiceQuestionRequest {
  readonly no: number;
  readonly ordinalNumber: number;
  readonly selectedAnswers: QuizVerifyClosedQuestionAnswerRequest[];
  readonly unselectedAnswers: QuizVerifyClosedQuestionAnswerRequest[];
}
