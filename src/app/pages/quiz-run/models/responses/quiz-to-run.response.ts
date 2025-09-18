import { AggregateId } from '../../../../../../common/types/aggregate-id.type';
import { QuizToRunClosedQuestionResponse } from './quiz-to-run-closed-question.response';
import { QuizToRunOpenQuestionResponse } from './quiz-to-run-open-question.response';
import { TimeSpanModel } from '../../../../../../common/models/time-span.model';
import { TimeSpan } from '../../../../../../common/types/time-span.type';

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
