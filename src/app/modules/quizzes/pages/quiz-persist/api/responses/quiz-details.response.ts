import type { AggregateId } from '@common/types/aggregate-id.type';
import type { QuizCopyMode } from '@app/modules/quizzes/pages/quizzes/enums/quiz-copy-mode.enum';
import type { QuizDetailsClosedQuestionResponse } from '@app/modules/quizzes/pages/quiz-persist/api/responses/quiz-details-closed-question.response';
import type { QuizDetailsOpenQuestionResponse } from '@app/modules/quizzes/pages/quiz-persist/api/responses/quiz-details-open-question.response';
import type { TimeSpanModel } from '@common/models/time-span.model';
import type { TimeSpan } from '@common/types/time-span.type';

export type QuizDetailsRawResponse = Omit<QuizDetailsResponse, 'duration' | 'copyMode'> & {
  duration: TimeSpan;
  copyMode: string;
};

export interface QuizDetailsResponse {
  readonly id: AggregateId;
  readonly title: string;
  readonly duration: TimeSpanModel;
  readonly questionsCountInRunningQuiz: number;
  readonly randomQuestions: boolean;
  readonly randomAnswers: boolean;
  readonly negativePoints: boolean;
  copyMode: QuizCopyMode;
  readonly openQuestions: QuizDetailsOpenQuestionResponse[];
  readonly singleChoiceQuestions: QuizDetailsClosedQuestionResponse[];
  readonly multipleChoiceQuestions: QuizDetailsClosedQuestionResponse[];
}
