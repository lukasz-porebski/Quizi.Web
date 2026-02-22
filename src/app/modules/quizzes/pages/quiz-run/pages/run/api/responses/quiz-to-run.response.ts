import type { AggregateId } from '@common/types/aggregate-id.type';
import type { QuizToRunClosedQuestionResponse } from '@app/modules/quizzes/pages/quiz-run/pages/run/api/responses/quiz-to-run-closed-question.response';
import type { QuizToRunOpenQuestionResponse } from '@app/modules/quizzes/pages/quiz-run/pages/run/api/responses/quiz-to-run-open-question.response';
import type { TimeSpanModel } from '@common/models/time-span.model';
import type { TimeSpan } from '@common/types/time-span.type';

export type QuizToRunRawResponse = Omit<QuizToRunResponse, 'duration' | 'copyMode'> & {
  duration: TimeSpan;
  copyMode: string;
};

export interface QuizToRunResponse {
  readonly id: AggregateId;
  readonly title: string;
  readonly duration: TimeSpanModel;
  readonly openQuestions: QuizToRunOpenQuestionResponse[];
  readonly singleChoiceQuestions: QuizToRunClosedQuestionResponse[];
  readonly multipleChoiceQuestions: QuizToRunClosedQuestionResponse[];
}
