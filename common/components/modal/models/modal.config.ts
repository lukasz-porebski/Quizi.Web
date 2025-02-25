import { isDefined } from '../../../utils/utils';
import { ITextConfig, TextConfig } from '../../../models/text.config';

export interface IModalConfig {
  text?: ITextConfig;
  modalMaxWidth?: boolean;
  modalContentMaxWidth?: boolean;
}

export class ModalConfig {
  public text?: TextConfig;
  public modalMaxWidth: boolean = false;
  public modalContentMaxWidth: boolean = false;

  public constructor(config: IModalConfig) {
    this.text = isDefined(config.text) ? new TextConfig(config.text) : undefined;
    this.modalMaxWidth = config.modalMaxWidth ?? false;
    this.modalContentMaxWidth = config.modalContentMaxWidth ?? false;
  }
}
