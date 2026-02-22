import type { FormControl } from '@angular/forms';

export interface IQuizPersistFormSingleChoiceQuestionAnswer {
  ordinalNumber: FormControl<number>;
  text: FormControl<string>;
}
