import type { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import type { QuizPersistFormGroup } from '@app/modules/quizzes/pages/quiz-persist/form/quiz-persist.form-group';
import type { Optional } from '@lukasz-porebski/lp-common';
import { isDefined } from '@lukasz-porebski/lp-common';

export namespace QuizPersistHeaderValidators {
  export function MaxQuestionsCountInRunningQuiz(): ValidatorFn {
    return (control: AbstractControl<Optional<number>>): ValidationErrors | null => {
      const parent = control.parent as unknown as QuizPersistFormGroup;
      if (!isDefined(control.value) || !isDefined(parent)) {
        return null;
      }

      return control.value <= parent.getQuestions().length ? null : { max: true };
    };
  }
}
