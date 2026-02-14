import { TimeSpan } from '@common/types/time-span.type';
import { QuizCopyMode } from '@app/modules/quizzes/pages/quizzes/enums/quiz-copy-mode.enum';
import { AggregateId } from '@common/types/aggregate-id.type';
import { TimeSpanModel } from '@common/models/time-span.model';
import { Guid } from '@common/types/guid.type';

export type QuizzesListItemRawResponse = Omit<QuizzesListItemResponse, 'duration' | 'copyMode'> & {
  duration: TimeSpan;
  copyMode: string;
};

export interface QuizzesListItemResponse {
  readonly id: AggregateId;
  readonly title: string;
  readonly duration: TimeSpanModel;
  readonly code: Guid;
  readonly copyMode: QuizCopyMode;
  readonly questionsCount: number;
  readonly questionsCountInRunningQuiz: number;
}
