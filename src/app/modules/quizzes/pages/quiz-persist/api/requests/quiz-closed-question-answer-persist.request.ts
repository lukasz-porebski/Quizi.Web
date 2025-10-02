export interface QuizClosedQuestionAnswerPersistRequest {
  readonly ordinalNumber: number;
  readonly text: string;
  readonly isCorrect: boolean;
}
