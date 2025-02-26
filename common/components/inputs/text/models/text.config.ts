import { ITextConfig, TextConfig } from '../../../../models/text.config';
import { IAttribute } from '../../../../interfaces/attribute.intreface';
import { HintConfig, IHintConfig } from '../../../hint/models/hint.config';
import { FormControl } from '@angular/forms';
import { isDefined } from '../../../../utils/utils';
import { TextInputType } from '../enums/type.enum';

export interface ITextInputConfig {
  label: ITextConfig;
  readonly?: boolean;
  disabled?: boolean;
  type?: TextInputType;
  attribute?: IAttribute;
  hint?: IHintConfig;
  minLength?: number;
  maxLength?: number;
  passwordShowButton?: boolean;
}

export class TextInputConfig {
  public get formControl(): FormControl {
    return isDefined(this.attribute)
      ? this.attribute.formControl
      : this._formControl;
  }

  public label: TextConfig;
  public readonly: boolean;
  public disabled: boolean;
  public type: TextInputType;
  public attribute?: IAttribute;
  public hint?: HintConfig;
  public minLength?: number;
  public maxLength?: number;
  public passwordShowButton?: boolean;

  private readonly _formControl = new FormControl();

  public constructor(config: ITextInputConfig) {
    this.label = new TextConfig(config.label);
    this.readonly = config.readonly ?? false;
    this.disabled = config.disabled ?? false;
    this.type = config.type ?? TextInputType.Text;
    this.attribute = config.attribute;
    this.hint = isDefined(config.hint)
      ? new HintConfig(config.hint)
      : undefined;
    this.minLength = config.minLength;
    this.maxLength = config.maxLength;
    this.passwordShowButton = config.passwordShowButton;
  }
}
