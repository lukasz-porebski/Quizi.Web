export interface QuizResultDetailsOpenQuestionResponse {
  readonly ordinalNumber: number;
  readonly text: string;
  readonly correctAnswer: string;
  readonly givenAnswer: string;
  readonly scoredPoints: number;
  readonly pointsPossibleToGet: number;
  readonly isCorrect?: boolean;
}
