import { FormControl } from '@angular/forms';
import { ErrorModel } from '../models/error.model';

export interface IAttribute {
  readonly formControl: FormControl;
  readonly error: ErrorModel;
}
