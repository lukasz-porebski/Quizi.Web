import { FormControl } from '@angular/forms';

export interface IQuizPersistFormOpenQuestion {
  text: FormControl<string>;
  answer: FormControl<string>;
}
