import { AbstractControl, FormGroup } from '@angular/forms';
import { QuizPersistFormQuestionType } from '../enums/quiz-persist-question-type.enum';

export class QuizPersistQuestionFormGroup<
  T extends { [K in keyof T]: AbstractControl<any, any> },
> extends FormGroup<T> {
  public readonly type: QuizPersistFormQuestionType;

  public constructor(controls: T, type: QuizPersistFormQuestionType) {
    super(controls);
    this.type = type;
  }
}
