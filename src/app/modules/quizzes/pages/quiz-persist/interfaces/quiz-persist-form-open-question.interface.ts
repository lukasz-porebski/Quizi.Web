import type { FormControl } from '@angular/forms';

export interface IQuizPersistFormOpenQuestion {
  ordinalNumber: FormControl<number>;
  text: FormControl<string>;
  answer: FormControl<string>;
}
