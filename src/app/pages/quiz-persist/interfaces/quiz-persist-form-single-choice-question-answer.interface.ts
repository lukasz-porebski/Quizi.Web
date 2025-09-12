import { FormControl } from '@angular/forms';
import { Optional } from '../../../../../common/types/optional.type';

export interface IQuizPersistFormSingleChoiceQuestionAnswer {
  no: FormControl<Optional<number>>;
  text: FormControl<string>;
}
