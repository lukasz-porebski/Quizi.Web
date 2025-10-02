import { FormControl } from '@angular/forms';
import { Optional } from '@common/types/optional.type';

export interface ITimeSpanFormControl {
  hours: FormControl<Optional<number>>;
  minutes: FormControl<Optional<number>>;
  seconds: FormControl<Optional<number>>;
}
