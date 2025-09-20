import { QuizVerifySingleChoiceQuestionRequest } from './quiz-verify-single-choice-question.request';
import { QuizVerifyOpenQuestionRequest } from './quiz-verify-open-question.request';
import { PeriodRequest } from '../../../../../../../../common/models/requests/period.request';
import { AggregateId } from '../../../../../../../../common/types/aggregate-id.type';
import { QuizVerifyMultipleChoiceQuestionRequest } from './quiz-verify-multiple-choice-question.request';

export interface QuizVerifyRequest {
  readonly quizId: AggregateId;
  readonly quizRunningPeriod: PeriodRequest<Date>;
  readonly openQuestions: QuizVerifyOpenQuestionRequest[];
  readonly singleChoiceQuestions: QuizVerifySingleChoiceQuestionRequest[];
  readonly multipleChoiceQuestions: QuizVerifyMultipleChoiceQuestionRequest[];
}
