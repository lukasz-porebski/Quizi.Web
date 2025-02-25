import { ITextConfig, TextConfig } from '../../../../models/text.config';
import { IAttribute } from '../../../../interfaces/attribute.intreface';
import { HintConfig, IHintConfig } from '../../../hint/models/hint.config';
import { FormControl } from '@angular/forms';
import { isDefined } from '../../../../utils/utils';

export interface INumberInputConfig {
  label: ITextConfig;
  readonly?: boolean;
  disabled?: boolean;
  attribute?: IAttribute;
  hint?: IHintConfig;
  min?: number;
  max?: number;
}

export class NumberInputConfig {
  public get formControl(): FormControl {
    return isDefined(this.attribute) ? this.attribute.formControl : this._formControl;
  }

  public label: TextConfig;
  public readonly: boolean;
  public disabled: boolean;
  public attribute?: IAttribute;
  public hint?: HintConfig;
  public min?: number;
  public max?: number;

  private readonly _formControl = new FormControl();

  public constructor(config: INumberInputConfig) {
    this.label = new TextConfig(config.label);
    this.readonly = config.readonly ?? false;
    this.disabled = config.disabled ?? false;
    this.attribute = config.attribute;
    this.hint = isDefined(config.hint) ? new HintConfig(config.hint) : undefined;
    this.min = config.min;
    this.max = config.max;
  }
}
