import type { FormControl } from '@angular/forms';

export interface IRegistrationForm {
  email: FormControl<string>;
  password: FormControl<string>;
  confirmedPassword: FormControl<string>;
}
