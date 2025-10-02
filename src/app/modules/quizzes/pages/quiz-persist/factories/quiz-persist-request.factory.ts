import { QuizPersistFormGroup } from '../form/quiz-persist.form-group';
import { QuizCreateRequest } from '../api/requests/quiz-create.request';
import { QuizSettingsPersistRequest } from '../api/requests/quiz-settings-persist.request';
import { TimeSpanUtils } from '../../../../../../../common/utils/time-span.utils';
import { QuizOpenQuestionPersistRequest } from '../api/requests/quiz-open-question-persist.request';
import { QuizClosedQuestionCreateRequest } from '../api/requests/quiz-closed-question-create.request';
import { QuizPersistSingleChoiceQuestionFormGroup } from '../form/quiz-persist-single-choice-question.form-group';
import { QuizClosedQuestionAnswerPersistRequest } from '../api/requests/quiz-closed-question-answer-persist.request';
import { QuizPersistSingleChoiceQuestionAnswerFormGroup } from '../form/quiz-persist-single-choice-question-answer.form-group';
import { QuizPersistMultipleChoiceQuestionFormGroup } from '../form/quiz-persist-multiple-choice-question.form-group';
import { QuizPersistMultipleChoiceQuestionAnswerFormGroup } from '../form/quiz-persist-multiple-choice-question-answer.form-group';
import { AggregateId } from '../../../../../../../common/types/aggregate-id.type';
import { QuizUpdateRequest } from '../api/requests/quiz-update.request';
import { QuizClosedQuestionUpdateRequest } from '../api/requests/quiz-closed-question-update.request';
import { EntityPersistRequest } from '../../../../../../../common/models/responses/entity-persist.request';
import { QuizPersistOpenQuestionFormGroup } from '../form/quiz-persist-open-question.form-group';

export namespace QuizPersistRequestFactory {
  export function CreateForCreate(form: QuizPersistFormGroup): QuizCreateRequest {
    return {
      title: form.value.title!,
      description: form.value.description!,
      settings: createSettings(form),
      openQuestions: (form.controls.openQuestions.controls ?? []).map((q) => persistOpenQuestion(q)),
      singleChoiceQuestions: (form.controls.singleChoiceQuestions.controls ?? []).map((q) =>
        createSingleChoiceQuestion(q),
      ),
      multipleChoiceQuestions: (form.controls.multipleChoiceQuestions.controls ?? []).map((q) =>
        createMultipleChoiceQuestion(q),
      ),
    };
  }

  export function CreateForUpdate(id: AggregateId, form: QuizPersistFormGroup): QuizUpdateRequest {
    return {
      id: id,
      title: form.value.title!,
      description: form.value.description!,
      settings: createSettings(form),
      openQuestions: (form.controls.openQuestions.controls ?? []).map((q) => {
        const result: EntityPersistRequest<QuizOpenQuestionPersistRequest> = {
          no: q.no ?? undefined,
          data: persistOpenQuestion(q),
        };
        return result;
      }),
      singleChoiceQuestions: (form.controls.singleChoiceQuestions.controls ?? []).map((q) =>
        updateSingleChoiceQuestion(q),
      ),
      multipleChoiceQuestions: (form.controls.multipleChoiceQuestions.controls ?? []).map((q) =>
        updateMultipleChoiceQuestion(q),
      ),
    };
  }

  function createSettings(form: QuizPersistFormGroup): QuizSettingsPersistRequest {
    return {
      duration: TimeSpanUtils.ToTimeSpanByForm(form.controls.duration.controls),
      questionsCountInRunningQuiz: form.value.questionsCountInRunningQuiz!,
      randomQuestions: form.value.randomQuestions!,
      randomAnswers: form.value.randomAnswers!,
      negativePoints: form.value.negativePoints!,
      copyMode: form.value.copyMode!,
    };
  }

  function persistOpenQuestion(form: QuizPersistOpenQuestionFormGroup): QuizOpenQuestionPersistRequest {
    return {
      ordinalNumber: form.value.ordinalNumber!,
      text: form.value.text!,
      answer: form.value.answer!,
    };
  }

  function createSingleChoiceQuestion(
    form: QuizPersistSingleChoiceQuestionFormGroup,
  ): QuizClosedQuestionCreateRequest {
    return {
      ordinalNumber: form.value.ordinalNumber!,
      text: form.value.text!,
      answers: (form.controls.answers.controls ?? []).map((a) =>
        persistSingleChoiceQuestionAnswer(a, form.value.correctAnswerOrdinalNumber!),
      ),
    };
  }

  function updateSingleChoiceQuestion(
    form: QuizPersistSingleChoiceQuestionFormGroup,
  ): EntityPersistRequest<QuizClosedQuestionUpdateRequest> {
    return {
      no: form.no ?? undefined,
      data: {
        ordinalNumber: form.value.ordinalNumber!,
        text: form.value.text!,
        answers: (form.controls.answers.controls ?? []).map((a) => {
          const result: EntityPersistRequest<QuizClosedQuestionAnswerPersistRequest> = {
            no: a.no ?? undefined,
            data: persistSingleChoiceQuestionAnswer(a, form.value.correctAnswerOrdinalNumber!),
          };
          return result;
        }),
      },
    };
  }

  function persistSingleChoiceQuestionAnswer(
    form: QuizPersistSingleChoiceQuestionAnswerFormGroup,
    correctAnswerOrdinalNumber: number,
  ): QuizClosedQuestionAnswerPersistRequest {
    return {
      ordinalNumber: form.value.ordinalNumber!,
      text: form.value.text!,
      isCorrect: form.value.ordinalNumber === correctAnswerOrdinalNumber,
    };
  }

  function createMultipleChoiceQuestion(
    form: QuizPersistMultipleChoiceQuestionFormGroup,
  ): QuizClosedQuestionCreateRequest {
    return {
      ordinalNumber: form.value.ordinalNumber!,
      text: form.value.text!,
      answers: (form.controls.answers.controls ?? []).map((a) => persistMultipleChoiceQuestionAnswer(a)),
    };
  }

  function updateMultipleChoiceQuestion(
    form: QuizPersistMultipleChoiceQuestionFormGroup,
  ): EntityPersistRequest<QuizClosedQuestionUpdateRequest> {
    return {
      no: form.no ?? undefined,
      data: {
        ordinalNumber: form.value.ordinalNumber!,
        text: form.value.text!,
        answers: (form.controls.answers.controls ?? []).map((a) => {
          const result: EntityPersistRequest<QuizClosedQuestionAnswerPersistRequest> = {
            no: a.no ?? undefined,
            data: persistMultipleChoiceQuestionAnswer(a),
          };
          return result;
        }),
      },
    };
  }

  function persistMultipleChoiceQuestionAnswer(
    form: QuizPersistMultipleChoiceQuestionAnswerFormGroup,
  ): QuizClosedQuestionAnswerPersistRequest {
    return {
      ordinalNumber: form.value.ordinalNumber!,
      text: form.value.text!,
      isCorrect: form.value.isCorrect!,
    };
  }
}
