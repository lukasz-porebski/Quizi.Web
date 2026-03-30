import type { QuizCopyMode } from '@app/modules/quizzes/pages/quizzes/enums/quiz-copy-mode.enum';
import type { AggregateId, Guid, TimeSpan, TimeSpanModel } from 'lp-common';

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
