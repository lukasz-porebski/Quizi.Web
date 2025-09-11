import { isDefined } from '../../utils/utils';
import { FormControl } from '@angular/forms';
import { ISelectAttributeConfig, SelectAttribute } from './select-attribute';

export interface IMultipleSelectAttributeConfig<TData, TValue = TData>
  extends ISelectAttributeConfig<TData, TValue> {
  defaultValue?: TValue[];
}

export class MultipleSelectAttribute<TData, TValue = TData> extends SelectAttribute<TData, TValue> {
  public get value(): TValue[] {
    return this.formControl.value as TValue[];
  }

  public set value(v: TValue[]) {
    this.formControl.setValue(v);
  }

  public constructor(configuration: IMultipleSelectAttributeConfig<TData, TValue>) {
    const defaultValue = isDefined(configuration.defaultValue) ? [...configuration.defaultValue] : [];
    super(configuration, (validators) => new FormControl<TValue[]>(defaultValue, validators));
  }
}
