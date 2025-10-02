import { TimeSpan } from '../../../../../../../common/types/time-span.type';
import { QuizCopyMode } from '../enums/quiz-copy-mode.enum';
import { AggregateId } from '../../../../../../../common/types/aggregate-id.type';
import { TimeSpanModel } from '../../../../../../../common/models/time-span.model';

export type QuizzesListItemRawResponse = Omit<QuizzesListItemResponse, 'duration' | 'copyMode'> & {
  duration: TimeSpan;
  copyMode: string;
};

export class QuizzesListItemResponse {
  public readonly id: AggregateId;
  public readonly title: string;
  public readonly duration: TimeSpanModel;
  public readonly copyMode: QuizCopyMode;
  public readonly questionsCount: number;
  public readonly questionsCountInRunningQuiz: number;

  public constructor(data: QuizzesListItemRawResponse) {
    this.id = data.id;
    this.title = data.title;
    this.duration = TimeSpanModel.CreateByTimeSpan(data.duration);
    this.copyMode = QuizCopyMode[data.copyMode as keyof typeof QuizCopyMode];
    this.questionsCount = data.questionsCount;
    this.questionsCountInRunningQuiz = data.questionsCountInRunningQuiz;
  }
}
