import { QuizDetailsChoiceQuestionAnswerResponse } from './quiz-details-choice-question-answer.response';

export interface QuizDetailsChoiceQuestionResponse {
  readonly no: number;
  readonly ordinalNumber: number;
  readonly text: string;
  readonly answers: QuizDetailsChoiceQuestionAnswerResponse[];
}
