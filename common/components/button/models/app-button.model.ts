import { AppButtonColor } from '../enums/app-button-color.enum';
import { AppTextModel, IAppText } from '../../../models/app-text.model';
import { isDefined } from '../../../utils/utils';

export interface IAppButton {
  label: IAppText;
  color?: AppButtonColor;
  disabled?: () => boolean;
  matStepperNext?: boolean;
  onClick?: () => void;
  tooltip?: IAppText;
}

export class AppButtonModel {
  public label?: AppTextModel;
  public color: AppButtonColor;
  public disabled: () => boolean;
  public matStepperNext: boolean;
  public onClick: () => void;
  public tooltip?: AppTextModel;

  constructor(configuration: IAppButton) {
    this.label = isDefined(configuration.label) ? new AppTextModel(configuration.label) : undefined;
    this.color = configuration.color ?? AppButtonColor.Accent;
    this.onClick = configuration.onClick ?? (() => {
    });
    this.disabled = configuration.disabled ?? (() => false);
    this.matStepperNext = configuration.matStepperNext ?? false;
    this.tooltip = isDefined(configuration.tooltip) ? new AppTextModel(configuration.tooltip) : undefined;
  }
}
