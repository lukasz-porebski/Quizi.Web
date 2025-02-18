import { IAttribute } from '../interfaces/attribute.intreface';
import { isDefined } from '../utils/utils';
import { ErrorModel } from '../models/error-model';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { Nullable } from '../types/nullable.type';

export interface IDateAttributeConfig {
  defaultValue?: Date;
  min?: Date;
  max?: Date;
  isRequired?: boolean;
}

export class DateAttribute implements IAttribute {
  public get error(): ErrorModel {
    this._error.setMessage('');

    if (this.formControl.errors?.['required']) {
      return this._error.setMessage('FIELD_IS_REQUIRED');
    }

    return this._error;
  }

  public readonly defaultValue: Nullable<Date> = null;
  public readonly formControl: FormControl<Nullable<Date>>;
  public readonly min?: Date;
  public readonly max?: Date;
  public readonly isRequired: boolean = false;

  private readonly _error = new ErrorModel();
  private readonly _validators: ValidatorFn[] = [];

  public constructor(config?: IDateAttributeConfig) {
    if (isDefined(config)) {
      this.defaultValue = config.defaultValue ?? null;
      this.min = config.min;
      this.max = config.min;
      this.isRequired = config.isRequired ?? false;
    }

    if (this.isRequired) {
      this._validators.push(Validators.required);
    }

    this.formControl = new FormControl(this.defaultValue, this._validators);
  }
}
