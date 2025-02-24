import { ButtonColor } from '../enums/button-color.enum';
import { ITextConfig, TextModel } from '../../../models/text.model';
import { isDefined } from '../../../utils/utils';

export interface IButtonConfig {
  label: ITextConfig;
  color?: ButtonColor;
  disabled?: () => boolean;
  matStepperNext?: boolean;
  onClick?: () => void;
  tooltip?: ITextConfig;
}

export class ButtonModel {
  public label?: TextModel;
  public color: ButtonColor;
  public disabled: () => boolean;
  public matStepperNext: boolean;
  public onClick: () => void;
  public tooltip?: TextModel;

  constructor(config: IButtonConfig) {
    this.label = isDefined(config.label) ? new TextModel(config.label) : undefined;
    this.color = config.color ?? ButtonColor.Accent;
    this.onClick = config.onClick ?? (() => {
    });
    this.disabled = config.disabled ?? (() => false);
    this.matStepperNext = config.matStepperNext ?? false;
    this.tooltip = isDefined(config.tooltip) ? new TextModel(config.tooltip) : undefined;
  }
}
