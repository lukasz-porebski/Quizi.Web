import type { TimeSpan } from '@common/types/time-span.type';
import type { QuizCopyMode } from '@app/modules/quizzes/pages/quizzes/enums/quiz-copy-mode.enum';
import type { AggregateId } from '@common/types/aggregate-id.type';
import type { TimeSpanModel } from '@common/models/time-span.model';
import type { Guid } from '@common/types/guid.type';

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
