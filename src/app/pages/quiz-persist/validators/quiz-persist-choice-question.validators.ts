import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { QuizPersistSingleChoiceQuestionFormGroup } from '../form/quiz-persist-single-choice-question.form-group';
import { QuizPersistMultipleChoiceQuestionFormGroup } from '../form/quiz-persist-multiple-choice-question.form-group';

export namespace QuizPersistChoiceQuestionValidators {
  export function MinAnswersCount(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const form = control as
        | QuizPersistSingleChoiceQuestionFormGroup
        | QuizPersistMultipleChoiceQuestionFormGroup;
      return (form.value.answers ?? []).length >= 2 ? null : { minAnswersCount: true };
    };
  }
}
