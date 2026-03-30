import type { QuizResultDetailsMultipleChoiceQuestionResponse } from '@app/modules/quiz-results/pages/quiz-result/api/responses/quiz-result-details-multiple-choice-question.response';
import type { QuizResultDetailsOpenQuestionResponse } from '@app/modules/quiz-results/pages/quiz-result/api/responses/quiz-result-details-open-question.response';
import type { QuizResultDetailsSingleChoiceQuestionResponse } from '@app/modules/quiz-results/pages/quiz-result/api/responses/quiz-result-details-single-choice-question.response';
import type { AggregateId, PeriodRawViewModel, PeriodViewModel, TimeSpan, TimeSpanModel } from 'lp-common';

export type QuizResultDetailsRawResponse = Omit<
  QuizResultDetailsResponse,
  'quizRunningPeriod' | 'maxDuration'
> & {
  quizRunningPeriod: PeriodRawViewModel;
  duration: TimeSpan;
  maxDuration: TimeSpan;
};

export interface QuizResultDetailsResponse {
  readonly id: AggregateId;
  readonly title: string;
  readonly quizRunningPeriod: PeriodViewModel<Date>;
  readonly duration: TimeSpanModel;
  readonly maxDuration: TimeSpanModel;
  readonly negativePoints: boolean;
  readonly randomQuestions: boolean;
  readonly randomAnswers: boolean;
  readonly openQuestions: QuizResultDetailsOpenQuestionResponse[];
  readonly singleChoiceQuestions: QuizResultDetailsSingleChoiceQuestionResponse[];
  readonly multipleChoiceQuestions: QuizResultDetailsMultipleChoiceQuestionResponse[];
}
