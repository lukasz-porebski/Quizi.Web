import type { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import type { Optional } from '@common/types/optional.type';
import type { QuizPersistFormGroup } from '@app/modules/quizzes/pages/quiz-persist/form/quiz-persist.form-group';
import { isDefined } from '@common/utils/utils';

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
