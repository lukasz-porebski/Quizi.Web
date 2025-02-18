import { IAttribute } from '../interfaces/attribute.intreface';
import { ErrorModel } from '../models/error-model';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { isDefined } from '../utils/utils';
import { Nullable } from '../types/nullable.type';

export interface ITextAttributeConfig {
  translateRoute: string;
  defaultValue?: string;
  isRequired?: boolean;
  minLength?: number;
  maxLength?: number;
}

export class TextAttribute implements IAttribute {
  public get error(): ErrorModel {
    this._error.setMessage('');

    if (this.formControl.errors?.['required']) {
      return this._error.setMessage('FIELD_IS_REQUIRED');
    }

    if (isDefined(this._config.minLength) && isDefined(this._config.maxLength)) {
      if (this.formControl.errors?.['minlength'] || this.formControl.errors?.['maxlength']) {
        return this._error.setMessage('VALID_TEXT_RANGE',
          {
            min: this._config.minLength,
            max: this._config.maxLength
          });
      }
    } else {
      if (this.formControl.errors?.['minlength']) {
        return this._error.setMessage('MIN_TEXT_LENGTH',
          {
            value: this._config.minLength
          });
      }

      if (this.formControl.errors?.['maxlength']) {
        return this._error.setMessage('MAX_TEXT_LENGTH',
          {
            value: this._config.maxLength
          });
      }
    }

    return this._error;
  }

  public readonly translateRoute: string;
  public readonly formControl: FormControl<Nullable<string>>;
  public readonly defaultValue: Nullable<string>;

  private readonly _error = new ErrorModel();

  public constructor(private readonly _config: ITextAttributeConfig) {
    this.translateRoute = _config.translateRoute;
    this.defaultValue = _config.defaultValue ?? null;
    const validators: ValidatorFn[] = [];

    if (_config.isRequired) {
      validators.push(Validators.required);
    }

    if (_config.minLength) {
      validators.push(Validators.minLength(_config.minLength));
    }

    if (_config.maxLength) {
      validators.push(Validators.maxLength(_config.maxLength));
    }

    this.formControl = new FormControl(this.defaultValue, validators);
  }
}

