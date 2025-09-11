import { InputColor } from '../../shared/enums/input-color.enum';
import { FormControl } from '@angular/forms';
import { IAttribute } from '../../../../interfaces/attribute.intreface';
import { isDefined } from '../../../../utils/utils';
import { ITextConfig, TextConfig } from '../../../../models/text.config';
import { RadioLabelPosition } from '../enums/label-position.enum';

export interface IRadioConfig<T> {
  label?: ITextConfig;
  readonly?: boolean;
  disabled?: boolean;
  options: T[];
  attribute?: IAttribute;
  optionLabelPosition?: RadioLabelPosition;
  translateOptionLabel?: boolean;
  color?: InputColor;
  optionText: (option: T) => string;
}

export class RadioConfig<T> {
  public get value(): T {
    return this.formControl.value as T;
  }

  public get formControl(): FormControl {
    return isDefined(this.attribute) ? this.attribute.formControl : this._formControl;
  }

  public label?: TextConfig;
  public readonly: boolean;
  public disabled: boolean;
  public options: T[];
  public attribute?: IAttribute;
  public optionLabelPosition: RadioLabelPosition;
  public translateOptionLabel: boolean;
  public color: InputColor;
  public optionText?: (option: T) => string;

  private readonly _formControl = new FormControl();

  public constructor(config: IRadioConfig<T>) {
    this.label = isDefined(config.label) ? new TextConfig(config.label) : undefined;
    this.readonly = config.readonly ?? false;
    this.disabled = config.disabled ?? false;
    this.options = [...config.options];
    this.attribute = config.attribute;
    this.optionLabelPosition = config.optionLabelPosition ?? RadioLabelPosition.After;
    this.color = config.color ?? InputColor.Default;
    this.optionText = config.optionText;
    this.translateOptionLabel = config.translateOptionLabel ?? true;
  }
}
