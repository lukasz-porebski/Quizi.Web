import { FormControl } from '@angular/forms';
import { IAttribute } from '../interfaces/attribute.intreface';
import { ErrorModel } from '../models/error.model';
import { Nullable } from '../types/nullable.type';

export interface IRadioAttributeConfig<TData> {
  translateRoute: string;
  options: TData[];
  defaultValue?: TData;
}

export class RadioAttribute<TData> implements IAttribute {
  public readonly error = new ErrorModel();

  public readonly translateRoute: string;
  public readonly options: TData[];
  public readonly defaultValue: Nullable<TData>;

  public readonly formControl: FormControl<Nullable<TData>>;

  constructor(config: IRadioAttributeConfig<TData>) {
    this.translateRoute = config.translateRoute;
    this.options = config.options;
    this.defaultValue = config.defaultValue ?? null;
    this.formControl = new FormControl(this.defaultValue);
  }
}
