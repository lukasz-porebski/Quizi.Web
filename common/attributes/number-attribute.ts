import { IAttribute } from '../interfaces/attribute.intreface';
import { ErrorModel } from '../models/error.model';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { Nullable } from '../types/nullable.type';
import { ITextConfig, TextConfig } from '../models/text.config';

export interface INumberAttributeConfig {
  label: ITextConfig;
  defaultValue?: number;
  min?: number;
  max?: number;
  required?: boolean;
}

export class NumberAttribute implements IAttribute {
  public get error(): ErrorModel {
    this._error.setMessage('');

    if (this.formControl.errors?.['required']) {
      return this._error.setMessage('FIELD_IS_REQUIRED');
    }

    if (this.formControl.errors?.['min']) {
      return this._error.setMessage('MIN_VALUE', {
        value: this.min,
      });
    }

    if (this.formControl.errors?.['max']) {
      return this._error.setMessage('MAX_VALUE', {
        value: this.max,
      });
    }

    return this._error;
  }

  public readonly label: TextConfig;
  public readonly defaultValue: Nullable<number>;
  public readonly formControl: FormControl<Nullable<number>>;
  public readonly min?: number;
  public readonly max?: number;

  private readonly _error = new ErrorModel();
  private readonly _validators: ValidatorFn[] = [];

  public constructor(config: INumberAttributeConfig) {
    this.label = new TextConfig(config.label);
    this.defaultValue = config.defaultValue ?? null;
    this.min = config.min;
    this.max = config.min;

    if (config.min) {
      this._validators.push(Validators.min(config.min));
    }

    if (config.max) {
      this._validators.push(Validators.max(config.max));
    }

    if (config.required) {
      this._validators.push(Validators.required);
    }

    this.formControl = new FormControl(this.defaultValue, this._validators);
  }
}
