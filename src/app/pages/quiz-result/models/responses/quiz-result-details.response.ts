import { QuizResultDetailsMultipleChoiceQuestionResponse } from './quiz-result-details-multiple-choice-question.response';
import { QuizResultDetailsOpenQuestionResponse } from './quiz-result-details-open-question.response';
import { AggregateId } from '../../../../../../common/types/aggregate-id.type';
import { TimeSpanModel } from '../../../../../../common/models/time-span.model';
import { TimeSpan } from '../../../../../../common/types/time-span.type';
import { PeriodRawViewModel, PeriodViewModel } from '../../../../../../common/models/views/period.view-model';
import { QuizResultDetailsSingleChoiceQuestionResponse } from './quiz-result-details-single-choice-question.response';

export type QuizResultDetailsRawResponse = Omit<
  QuizResultDetailsResponse,
  'quizRunningPeriod' | 'maxDuration'
> & {
  quizRunningPeriod: PeriodRawViewModel;
  maxDuration: TimeSpan;
};

export interface QuizResultDetailsResponse {
  readonly id: AggregateId;
  readonly title: string;
  readonly quizRunningPeriod: PeriodViewModel<Date>;
  readonly maxDuration: TimeSpanModel;
  readonly negativePoints: boolean;
  readonly randomQuestions: boolean;
  readonly randomAnswers: boolean;
  readonly openQuestions: QuizResultDetailsOpenQuestionResponse[];
  readonly singleChoiceQuestions: QuizResultDetailsSingleChoiceQuestionResponse[];
  readonly multipleChoiceQuestions: QuizResultDetailsMultipleChoiceQuestionResponse[];
}
