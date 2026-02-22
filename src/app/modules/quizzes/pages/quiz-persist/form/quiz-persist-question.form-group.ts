import { AbstractControl, AbstractControlOptions, FormGroup, ValidatorFn } from '@angular/forms';
import { QuizPersistFormQuestionType } from '@app/modules/quizzes/pages/quiz-persist/enums/quiz-persist-question-type.enum';

export class QuizPersistQuestionFormGroup<
  T extends { [K in keyof T]: AbstractControl<unknown, unknown> },
> extends FormGroup<T> {
  public readonly type: QuizPersistFormQuestionType;

  constructor(
    controls: T,
    type: QuizPersistFormQuestionType,
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
  ) {
    super(controls, validatorOrOpts);
    this.type = type;
  }
}
