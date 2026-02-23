import {
  type AbstractControl,
  FormArray,
  FormControl,
  type ValidationErrors,
  type ValidatorFn,
  Validators,
} from '@angular/forms';
import type { QuizDetailsClosedQuestionResponse } from '@app/modules/quizzes/pages/quiz-persist/api/responses/quiz-details-closed-question.response';
import { QuizPersistSingleChoiceQuestionFormGroup } from '@app/modules/quizzes/pages/quiz-persist/form/quiz-persist-single-choice-question.form-group';
import type { QuizDetailsClosedQuestionAnswerResponse } from '@app/modules/quizzes/pages/quiz-persist/api/responses/quiz-details-closed-question-answer.response';
import { QuizPersistClosedQuestionValidators } from '@app/modules/quizzes/pages/quiz-persist/validators/quiz-persist-closed-question.validators';
import { QuizPersistSingleChoiceQuestionAnswerFormGroup } from '@app/modules/quizzes/pages/quiz-persist/form/quiz-persist-single-choice-question-answer.form-group';
import { isEmpty } from '@common/utils/utils';

export namespace QuizPersistFormSingleChoiceQuestionFactory {
  export function CreateQuestion(
    ordinalNumber: number,
    response?: QuizDetailsClosedQuestionResponse,
  ): QuizPersistSingleChoiceQuestionFormGroup {
    return new QuizPersistSingleChoiceQuestionFormGroup(
      {
        ordinalNumber: new FormControl(ordinalNumber, {
          nonNullable: true,
          validators: [Validators.required],
        }),
        text: new FormControl(response?.text ?? '', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        answers: new FormArray<QuizPersistSingleChoiceQuestionAnswerFormGroup>(
          (response?.answers ?? []).map((a) => CreateAnswer(a.ordinalNumber, a)),
        ),
        correctAnswerOrdinalNumber: new FormControl(
          (response?.answers ?? []).find((a) => a.isCorrect)?.ordinalNumber,
          {
            validators: [Validators.required],
          },
        ),
      },
      response?.no,
      [
        QuizPersistClosedQuestionValidators.MinAnswersCount(),
        QuizPersistClosedQuestionValidators.AnswersAreUnique(),
        selectedCorrectAnswer(),
      ],
    );
  }

  export function CreateAnswer(
    ordinalNumber: number,
    response?: QuizDetailsClosedQuestionAnswerResponse,
  ): QuizPersistSingleChoiceQuestionAnswerFormGroup {
    return new QuizPersistSingleChoiceQuestionAnswerFormGroup(
      {
        ordinalNumber: new FormControl(ordinalNumber, {
          nonNullable: true,
          validators: [Validators.required],
        }),
        text: new FormControl(response?.text ?? '', {
          nonNullable: true,
          validators: [Validators.required],
        }),
      },
      response?.no,
    );
  }

  function selectedCorrectAnswer(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const form = control as QuizPersistSingleChoiceQuestionFormGroup;

      const answers = form.value.answers?.map((a) => a) ?? [];
      if (isEmpty(answers)) {
        return null;
      }

      return answers.some((a) => a.ordinalNumber === form.value.correctAnswerOrdinalNumber)
        ? null
        : { selectCorrectAnswer: true };
    };
  }
}
