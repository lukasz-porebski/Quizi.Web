import { ButtonColor } from '../enums/button-color.enum';
import { ITextConfig, TextConfig } from '../../../models/text.config';
import { isDefined } from '../../../utils/utils';

export interface IButtonConfig {
  text: ITextConfig;
  color?: ButtonColor;
  disabled?: () => boolean;
  matStepperNext?: boolean;
  onClick?: () => void;
  tooltip?: ITextConfig;
}

export class ButtonConfig {
  public text?: TextConfig;
  public color: ButtonColor;
  public disabled: () => boolean;
  public matStepperNext: boolean;
  public onClick: () => void;
  public tooltip?: TextConfig;

  public constructor(config: IButtonConfig) {
    this.text = isDefined(config.text) ? new TextConfig(config.text) : undefined;
    this.color = config.color ?? ButtonColor.Accent;
    this.onClick = config.onClick ?? (() => {
    });
    this.disabled = config.disabled ?? (() => false);
    this.matStepperNext = config.matStepperNext ?? false;
    this.tooltip = isDefined(config.tooltip) ? new TextConfig(config.tooltip) : undefined;
  }
}
