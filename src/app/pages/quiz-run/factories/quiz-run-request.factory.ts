import { QuizToRunResponse } from '../models/responses/quiz-to-run.response';
import { FormGroup } from '@angular/forms';
import { IQuizRunForm } from '../interfaces/quiz-run-form.interface';
import { QuizVerifyRequest } from '../models/requests/quiz-verify.request';
import { QuizVerifyOpenQuestionRequest } from '../models/requests/quiz-verify-open-question.request';
import { QuizVerifySingleChoiceQuestionRequest } from '../models/requests/quiz-verify-single-choice-question.request';
import { isDefined } from '../../../../../common/utils/utils';
import { QuizVerifyClosedQuestionAnswerRequest } from '../models/requests/quiz-verify-closed-question-answer.request';
import { QuizRunSingleChoiceQuestionFormControl } from '../form/quiz-run-single-choice-question-form.control';
import { QuizRunMultipleChoiceQuestionFormArray } from '../form/quiz-run-multiple-choice-question-form.array';
import { QuizVerifyMultipleChoiceQuestionRequest } from '../models/requests/quiz-verify-multiple-choice-question.request';
import { PeriodModel } from '../../../../../common/models/period.model';
import { PeriodUtils } from '../../../../../common/utils/period.utils';

export namespace QuizRunRequestFactory {
  export function Create(
    response: QuizToRunResponse,
    form: FormGroup<IQuizRunForm>,
    quizRunningPeriod: PeriodModel<Date>,
  ): QuizVerifyRequest {
    return {
      quizId: response.id,
      quizRunningPeriod: PeriodUtils.ToRequest(quizRunningPeriod),
      openQuestions: form.controls.openQuestions.controls.map((q) => {
        const request: QuizVerifyOpenQuestionRequest = {
          no: q.response.no,
          ordinalNumber: q.ordinalNumber,
          answer: q.value ?? '',
          isCorrect: false,
        };
        return request;
      }),
      singleChoiceQuestions: form.controls.singleChoiceQuestions.controls.map((q) =>
        createSingleChoiceQuestion(q),
      ),
      multipleChoiceQuestions: form.controls.multipleChoiceQuestions.controls.map((q) =>
        createMultipleChoiceQuestion(q),
      ),
    };
  }

  function createSingleChoiceQuestion(
    q: QuizRunSingleChoiceQuestionFormControl,
  ): QuizVerifySingleChoiceQuestionRequest {
    return {
      no: q.response.no,
      ordinalNumber: q.ordinalNumber,
      selectedAnswer: isDefined(q.value)
        ? {
            no: q.value,
            ordinalNumber: q.response.answers.find((a) => a.no === q.value)!.ordinalNumber,
          }
        : undefined,
      unselectedAnswers: q.response.answers
        .filter((a) => a.no !== q.value)
        .map((a) => {
          const request: QuizVerifyClosedQuestionAnswerRequest = {
            no: a.no,
            ordinalNumber: a.ordinalNumber,
          };
          return request;
        }),
    };
  }

  function createMultipleChoiceQuestion(
    q: QuizRunMultipleChoiceQuestionFormArray,
  ): QuizVerifyMultipleChoiceQuestionRequest {
    return {
      no: q.response.no,
      ordinalNumber: q.ordinalNumber,
      selectedAnswers: q.controls
        .filter((a) => a.value)
        .map((a) => {
          const request: QuizVerifyClosedQuestionAnswerRequest = {
            no: a.response.no,
            ordinalNumber: a.response.ordinalNumber,
          };
          return request;
        }),
      unselectedAnswers: q.controls
        .filter((a) => !isDefined(q.value) || !a.value)
        .map((a) => {
          const request: QuizVerifyClosedQuestionAnswerRequest = {
            no: a.response.no,
            ordinalNumber: a.response.ordinalNumber,
          };
          return request;
        }),
    };
  }
}
