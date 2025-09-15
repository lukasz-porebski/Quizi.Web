import { AbstractControl, AbstractControlOptions, FormGroup, ValidatorFn } from '@angular/forms';
import { QuizPersistFormQuestionType } from '../enums/quiz-persist-question-type.enum';

export class QuizPersistQuestionFormGroup<
  T extends { [K in keyof T]: AbstractControl<any, any> },
> extends FormGroup<T> {
  public readonly type: QuizPersistFormQuestionType;

  public constructor(
    controls: T,
    type: QuizPersistFormQuestionType,
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
  ) {
    super(controls, validatorOrOpts);
    this.type = type;
  }
}
