import { FormControl } from '@angular/forms';
import { Optional } from '../../../../../common/types/optional.type';

export interface IQuizPersistFormMultipleChoiceQuestionAnswer {
  no: FormControl<Optional<number>>;
  text: FormControl<string>;
  isCorrect: FormControl<boolean>;
}
