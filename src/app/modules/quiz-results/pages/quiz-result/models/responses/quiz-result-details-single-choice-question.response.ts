import { QuizResultDetailsSingleChoiceQuestionAnswerResponse } from './quiz-result-details-single-choice-question-answer.response';

export interface QuizResultDetailsSingleChoiceQuestionResponse {
  readonly ordinalNumber: number;
  readonly text: string;
  readonly scoredPoints: number;
  readonly pointsPossibleToGet: number;
  readonly selectedAnswerOrdinalNumber?: number;
  readonly answers: QuizResultDetailsSingleChoiceQuestionAnswerResponse[];
}
