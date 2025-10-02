import { TimeSpan } from '../../../../../../../common/types/time-span.type';
import { AggregateId } from '../../../../../../../common/types/aggregate-id.type';
import { TimeSpanModel } from '../../../../../../../common/models/time-span.model';

export type QuizResultsListItemRawResponse = Omit<
  QuizResultsListItemResponse,
  'duration' | 'maxDuration' | 'copyMode'
> & {
  quizRunningPeriodStart: string;
  quizRunningPeriodEnd: string;
  duration: TimeSpan;
  maxDuration: TimeSpan;
};

export class QuizResultsListItemResponse {
  public readonly id: AggregateId;
  public readonly title: string;
  public readonly scoredPoints: number;
  public readonly pointsPossibleToGet: number;
  public readonly quizRunningPeriodStart: Date;
  public readonly quizRunningPeriodEnd: Date;
  public readonly duration: TimeSpanModel;
  public readonly maxDuration: TimeSpanModel;

  public constructor(data: QuizResultsListItemRawResponse) {
    this.id = data.id;
    this.title = data.title;
    this.scoredPoints = data.scoredPoints;
    this.pointsPossibleToGet = data.pointsPossibleToGet;
    this.quizRunningPeriodStart = new Date(data.quizRunningPeriodStart);
    this.quizRunningPeriodEnd = new Date(data.quizRunningPeriodEnd);
    this.duration = TimeSpanModel.CreateByTimeSpan(data.duration);
    this.maxDuration = TimeSpanModel.CreateByTimeSpan(data.maxDuration);
  }
}
