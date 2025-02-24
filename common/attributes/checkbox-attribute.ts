import { FormControl } from '@angular/forms';
import { IAttribute } from '../interfaces/attribute.intreface';
import { ErrorModel } from '../models/error.model';

export interface ICheckboxAttributeConfig {
  translateRoute: string;
  defaultValue?: boolean;
}

export class CheckboxAttribute implements IAttribute {
  public readonly error = new ErrorModel();

  public readonly translateRoute: string;
  public readonly defaultValue: boolean;

  public readonly formControl: FormControl<boolean>;

  public constructor(config: ICheckboxAttributeConfig) {
    this.translateRoute = config.translateRoute;
    this.defaultValue = config.defaultValue ?? false;
    this.formControl = new FormControl<any>(this.defaultValue);
  }
}
