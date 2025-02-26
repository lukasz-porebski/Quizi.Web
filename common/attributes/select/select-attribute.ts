import { IAttribute } from '../../interfaces/attribute.intreface';
import { isDefined } from '../../utils/utils';
import { ErrorModel } from '../../models/error.model';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';

export interface ISelectAttributeConfig<TData, TValue = TData> {
  translateRoute: string;
  dataSource: ReadonlyArray<TData>;
  required?: boolean;
  valueSelector?: (data: TData) => TValue;
  optionTextSelector?: (data: TData) => string | number | TValue;
}

export abstract class SelectAttribute<TData, TValue = TData>
  implements IAttribute
{
  public abstract get value(): TValue[] | TValue;
  public abstract set value(v: TValue[] | TValue);

  public get error(): ErrorModel {
    this.errorModel.setMessage('');

    if (isDefined(this.formControl.errors?.['required'])) {
      return this.errorModel.setMessage('FIELD_IS_REQUIRED');
    }

    return this.errorModel;
  }

  public readonly translateRoute: string;
  public readonly dataSource: TData[];
  public readonly valueSelector: (TData: TData) => TValue;
  public readonly optionTextSelector: (data: TData) => string | number | TValue;
  public readonly formControl: FormControl<TValue[] | TValue | null>;

  protected readonly errorModel = new ErrorModel();
  protected readonly validators: ValidatorFn[] = [];

  protected constructor(
    config: ISelectAttributeConfig<TData, TValue>,
    createFormControl: (
      validators: ValidatorFn[],
    ) => FormControl<TValue[] | TValue | null>,
  ) {
    this.translateRoute = config.translateRoute;
    this.dataSource = [...config.dataSource];
    this.valueSelector = isDefined(config.valueSelector)
      ? config.valueSelector
      : (data) => data as unknown as TValue;
    this.optionTextSelector = isDefined(config.optionTextSelector)
      ? config.optionTextSelector
      : (data) => data as unknown as TValue;

    if (config.required) {
      this.validators.push(Validators.required);
    }
    this.formControl = createFormControl(this.validators);
  }
}
