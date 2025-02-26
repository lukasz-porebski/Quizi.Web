import { CheckboxLabelPosition } from '../enums/label-position.enum';
import { InputColor } from '../../shared/enums/input-color.enum';
import { FormControl } from '@angular/forms';
import { isDefined } from '../../../../utils/utils';
import { IAttribute } from '../../../../interfaces/attribute.intreface';
import { ITextConfig, TextConfig } from '../../../../models/text.config';

export interface ICheckboxConfig {
  label?: ITextConfig;
  readonly?: boolean;
  disabled?: boolean;
  labelPosition?: CheckboxLabelPosition;
  color?: InputColor;
  attribute?: IAttribute;
}

export class CheckboxConfig {
  public get formControl(): FormControl {
    return isDefined(this.attribute)
      ? this.attribute.formControl
      : this._formControl;
  }

  public label?: TextConfig;
  public readonly: boolean;
  public disabled: boolean;
  public labelPosition: CheckboxLabelPosition;
  public color: InputColor;
  public attribute?: IAttribute;

  private readonly _formControl = new FormControl();

  public constructor(config: ICheckboxConfig) {
    this.label = isDefined(config.label)
      ? new TextConfig(config.label)
      : undefined;
    this.readonly = config.readonly ?? false;
    this.disabled = config.disabled ?? false;
    this.labelPosition = config.labelPosition ?? CheckboxLabelPosition.After;
    this.color = config.color ?? InputColor.Default;
    this.attribute = config.attribute;
  }
}
