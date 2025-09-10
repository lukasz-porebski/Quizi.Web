import { FormControl } from '@angular/forms';
import { Optional } from '../../../../../common/types/optional.type';

export interface IQuizPersistForm {
  title: FormControl<Optional<string>>;
  questionsCountInRunningQuiz: FormControl<Optional<number>>;
}
