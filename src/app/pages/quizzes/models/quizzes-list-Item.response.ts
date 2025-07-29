import { TimeSpan } from '../../../../../common/types/time-span.type';
import { QuizCopyMode } from '../enums/quiz-copy-mode.enum';
import { AggregateId } from '../../../../../common/types/aggregate-id.type';

export class QuizzesListItemResponse {
  public readonly id: AggregateId;
  public readonly title: string;
  public readonly duration: TimeSpan;
  public readonly copyMode: QuizCopyMode;
  public readonly questionsCount: number;
  public readonly questionsCountInRunningQuiz: number;

  public constructor(data: QuizzesListItemResponse) {
    this.id = data.id;
    this.title = data.title;
    this.duration = data.duration;
    this.copyMode = data.copyMode;
    this.questionsCount = data.questionsCount;
    this.questionsCountInRunningQuiz = data.questionsCountInRunningQuiz;
  }
}
