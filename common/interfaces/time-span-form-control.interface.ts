import type { FormControl } from '@angular/forms';
import type { Optional } from '@common/types/optional.type';

export interface ITimeSpanFormControl {
  hours: FormControl<Optional<number>>;
  minutes: FormControl<Optional<number>>;
  seconds: FormControl<Optional<number>>;
}
