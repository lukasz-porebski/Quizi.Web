import { HintConfig, IHintConfig } from '../../../hint/models/hint.config';
import { FormControl } from '@angular/forms';
import { IAttribute } from '../../../../interfaces/attribute.intreface';
import { isDefined } from '../../../../utils/utils';
import { ITextConfig, TextConfig } from '../../../../models/text.config';

export interface ITextAreaConfig {
  label: ITextConfig;
  readonly?: boolean;
  disabled?: boolean;
  minRows?: number;
  maxRows?: number;
  noOverflow?: boolean;
  attribute?: IAttribute;
  hint?: IHintConfig;
}

export class TextAreaConfig {
  public get formControl(): FormControl {
    return isDefined(this.attribute) ? this.attribute.formControl : this._formControl;
  }

  public label: TextConfig;
  public readonly: boolean;
  public disabled: boolean;
  public minRows?: number;
  public maxRows?: number;
  public noOverflow: boolean;
  public attribute?: IAttribute;
  public hint?: HintConfig;

  private readonly _formControl = new FormControl();

  public constructor(config: ITextAreaConfig) {
    this.label = new TextConfig(config.label);
    this.readonly = config.readonly ?? false;
    this.disabled = config.disabled ?? false;
    this.minRows = config.minRows;
    this.maxRows = config.maxRows;
    this.noOverflow = config.noOverflow ?? false;
    this.attribute = config.attribute;
    this.hint = isDefined(config.hint) ? new HintConfig(config.hint) : undefined;
  }
}
