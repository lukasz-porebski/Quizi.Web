import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { QuizPersistSingleChoiceQuestionFormGroup } from '@app/modules/quizzes/pages/quiz-persist/form/quiz-persist-single-choice-question.form-group';
import { QuizPersistMultipleChoiceQuestionFormGroup } from '@app/modules/quizzes/pages/quiz-persist/form/quiz-persist-multiple-choice-question.form-group';
import { unique } from 'remeda';

type FormType = QuizPersistSingleChoiceQuestionFormGroup | QuizPersistMultipleChoiceQuestionFormGroup;

export namespace QuizPersistClosedQuestionValidators {
  export function MinAnswersCount(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const form = control as FormType;
      return (form.value.answers ?? []).length >= 2 ? null : { minAnswersCount: true };
    };
  }

  export function AnswersAreUnique(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const form = control as FormType;
      const answers = form.value.answers?.map((a) => a.text) ?? [];

      return unique(answers).length === answers.length ? null : { answersAreUnique: true };
    };
  }
}
