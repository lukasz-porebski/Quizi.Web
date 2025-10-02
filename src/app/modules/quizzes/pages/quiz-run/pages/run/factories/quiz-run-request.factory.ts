import { QuizToRunResponse } from '../api/responses/quiz-to-run.response';
import { QuizVerifyRequest } from '../api/requests/quiz-verify.request';
import { QuizVerifyOpenQuestionRequest } from '../api/requests/quiz-verify-open-question.request';
import { QuizVerifySingleChoiceQuestionRequest } from '../api/requests/quiz-verify-single-choice-question.request';
import { isDefined } from '../../../../../../../../../common/utils/utils';
import { QuizVerifyClosedQuestionAnswerRequest } from '../api/requests/quiz-verify-closed-question-answer.request';
import { QuizRunSingleChoiceQuestionFormControl } from '../form/quiz-run-single-choice-question-form.control';
import { QuizRunMultipleChoiceQuestionFormArray } from '../form/quiz-run-multiple-choice-question-form.array';
import { QuizVerifyMultipleChoiceQuestionRequest } from '../api/requests/quiz-verify-multiple-choice-question.request';
import { PeriodUtils } from '../../../../../../../../../common/utils/period.utils';
import { QuizRunFinishedEvent } from '../models/quiz-run-finished.event';
import { Optional } from '../../../../../../../../../common/types/optional.type';
import { FormArray } from '@angular/forms';
import { QuizRunOpenQuestionVerificationFormControl } from '../../open-questions-verification/form/quiz-run-open-question-verification.form-control';
import { QuizRunOpenQuestionFormControl } from '../form/quiz-run-open-question-form.control';
import { QuizRunOpenQuestionVerificationResult } from '../../open-questions-verification/enums/quiz-run-open-question-verification-result.enum';

export namespace QuizRunRequestFactory {
  export function Create(
    response: QuizToRunResponse,
    event: QuizRunFinishedEvent,
    openQuestionsVerificationForm: Optional<FormArray<QuizRunOpenQuestionVerificationFormControl>>,
  ): QuizVerifyRequest {
    return {
      quizId: response.id,
      quizRunningPeriod: PeriodUtils.ToRequest(event.quizRunningPeriod),
      openQuestions: event.form.controls.openQuestions.controls.map((q) =>
        createOpenQuestion(
          q,
          openQuestionsVerificationForm?.controls.find((c) => c.response.no === q.response.no),
        ),
      ),
      singleChoiceQuestions: event.form.controls.singleChoiceQuestions.controls.map((q) =>
        createSingleChoiceQuestion(q),
      ),
      multipleChoiceQuestions: event.form.controls.multipleChoiceQuestions.controls.map((q) =>
        createMultipleChoiceQuestion(q),
      ),
    };
  }

  function createOpenQuestion(
    question: QuizRunOpenQuestionFormControl,
    verification: Optional<QuizRunOpenQuestionVerificationFormControl>,
  ): QuizVerifyOpenQuestionRequest {
    let isCorrect: Optional<boolean> = undefined;
    switch (verification?.value ?? QuizRunOpenQuestionVerificationResult.NoDecision) {
      case QuizRunOpenQuestionVerificationResult.Correct:
        isCorrect = true;
        break;
      case QuizRunOpenQuestionVerificationResult.Incorrect:
        isCorrect = false;
        break;
    }

    return {
      no: question.response.no,
      ordinalNumber: question.ordinalNumber,
      answer: question.value ?? '',
      isCorrect: isCorrect ?? undefined,
    };
  }

  function createSingleChoiceQuestion(
    question: QuizRunSingleChoiceQuestionFormControl,
  ): QuizVerifySingleChoiceQuestionRequest {
    return {
      no: question.response.no,
      ordinalNumber: question.ordinalNumber,
      selectedAnswer: isDefined(question.value)
        ? {
            no: question.value,
            ordinalNumber: question.response.answers.find((a) => a.no === question.value)!.ordinalNumber,
          }
        : undefined,
      unselectedAnswers: question.response.answers
        .filter((a) => a.no !== question.value)
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
    question: QuizRunMultipleChoiceQuestionFormArray,
  ): QuizVerifyMultipleChoiceQuestionRequest {
    return {
      no: question.response.no,
      ordinalNumber: question.ordinalNumber,
      selectedAnswers: question.controls
        .filter((a) => a.value)
        .map((a) => {
          const request: QuizVerifyClosedQuestionAnswerRequest = {
            no: a.response.no,
            ordinalNumber: a.response.ordinalNumber,
          };
          return request;
        }),
      unselectedAnswers: question.controls
        .filter((a) => !isDefined(question.value) || !a.value)
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
