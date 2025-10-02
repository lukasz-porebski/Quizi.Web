import { QuizVerifySingleChoiceQuestionRequest } from './quiz-verify-single-choice-question.request';
import { QuizVerifyOpenQuestionRequest } from './quiz-verify-open-question.request';
import { PeriodViewModel } from '../../../../../../../../../../common/models/views/period.view-model';
import { AggregateId } from '../../../../../../../../../../common/types/aggregate-id.type';
import { QuizVerifyMultipleChoiceQuestionRequest } from './quiz-verify-multiple-choice-question.request';

export interface QuizVerifyRequest {
  readonly quizId: AggregateId;
  readonly quizRunningPeriod: PeriodViewModel<Date>;
  readonly openQuestions: QuizVerifyOpenQuestionRequest[];
  readonly singleChoiceQuestions: QuizVerifySingleChoiceQuestionRequest[];
  readonly multipleChoiceQuestions: QuizVerifyMultipleChoiceQuestionRequest[];
}
