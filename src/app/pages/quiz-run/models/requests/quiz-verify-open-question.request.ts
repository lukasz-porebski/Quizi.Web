export interface QuizVerifyOpenQuestionRequest {
  readonly no: number;
  readonly ordinalNumber: number;
  readonly answer: string;
  readonly isCorrect?: boolean;
}
