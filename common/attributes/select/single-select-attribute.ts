import { ISelectAttributeConfig, SelectAttribute } from './select-attribute';
import { FormControl } from '@angular/forms';

export interface ISingleSelectAttributeConfig<TData, TValue = TData>
  extends ISelectAttributeConfig<TData, TValue> {
  defaultValue?: TValue;
}

export class SingleSelectAttribute<TData, TValue = TData> extends SelectAttribute<TData, TValue> {
  public get value(): TValue {
    return this.formControl.value as TValue;
  }

  public set value(v: TValue) {
    this.formControl.setValue(v);
  }

  public constructor(config: ISingleSelectAttributeConfig<TData, TValue>) {
    super(config, validators =>
      new FormControl<TValue | null>(config.defaultValue ?? null, validators));
  }
}


