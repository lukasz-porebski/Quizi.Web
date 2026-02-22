import type { TimeSpan } from '@common/types/time-span.type';
import type { AggregateId } from '@common/types/aggregate-id.type';
import type { TimeSpanModel } from '@common/models/time-span.model';

export type QuizResultsListItemRawResponse = Omit<
  QuizResultsListItemResponse,
  'duration' | 'maxDuration' | 'copyMode'
> & {
  quizRunningPeriodStart: string;
  quizRunningPeriodEnd: string;
  duration: TimeSpan;
  maxDuration: TimeSpan;
};

export interface QuizResultsListItemResponse {
  readonly id: AggregateId;
  readonly title: string;
  readonly scoredPoints: number;
  readonly pointsPossibleToGet: number;
  readonly quizRunningPeriodStart: Date;
  readonly quizRunningPeriodEnd: Date;
  readonly duration: TimeSpanModel;
  readonly maxDuration: TimeSpanModel;
}
