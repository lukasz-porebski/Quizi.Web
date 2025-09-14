import { AggregateId } from '../../../../../common/types/aggregate-id.type';
import { QuizCopyMode } from '../../quizzes/enums/quiz-copy-mode.enum';
import { QuizDetailsChoiceQuestionResponse } from './quiz-details-choice-question.response';
import { QuizDetailsOpenQuestionResponse } from './quiz-details-open-question.response';
import { TimeSpanModel } from '../../../../../common/models/time-span.model';
import { TimeSpan } from '../../../../../common/types/time-span.type';

export type QuizDetailsRawResponse = Omit<QuizDetailsResponse, 'duration' | 'copyMode'> & {
  duration: TimeSpan;
  copyMode: string;
};

export interface QuizDetailsResponse {
  readonly id: AggregateId;
  readonly title: string;
  readonly duration: TimeSpanModel;
  readonly questionsCountInRunningQuiz: number;
  readonly randomQuestions: boolean;
  readonly randomAnswers: boolean;
  readonly negativePoints: boolean;
  copyMode: QuizCopyMode;
  readonly openQuestions: QuizDetailsOpenQuestionResponse[];
  readonly singleChoiceQuestions: QuizDetailsChoiceQuestionResponse[];
  readonly multipleChoiceQuestions: QuizDetailsChoiceQuestionResponse[];
}
