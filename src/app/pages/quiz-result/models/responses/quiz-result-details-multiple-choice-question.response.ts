import { QuizResultDetailsMultipleChoiceQuestionAnswerResponse } from './quiz-result-details-multiple-choice-question-answer.response';

export interface QuizResultDetailsMultipleChoiceQuestionResponse {
  readonly ordinalNumber: number;
  readonly text: string;
  readonly scoredPoints: number;
  readonly pointsPossibleToGet: number;
  readonly answers: QuizResultDetailsMultipleChoiceQuestionAnswerResponse[];
}
