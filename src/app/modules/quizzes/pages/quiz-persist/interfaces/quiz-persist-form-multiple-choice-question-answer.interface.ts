import { FormControl } from '@angular/forms';

export interface IQuizPersistFormMultipleChoiceQuestionAnswer {
  ordinalNumber: FormControl<number>;
  text: FormControl<string>;
  isCorrect: FormControl<boolean>;
}
