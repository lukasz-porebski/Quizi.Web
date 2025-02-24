import { isDefined } from '../../../utils/utils';
import { ITextConfig, TextModel } from '../../../models/text.model';

export interface IModalConfig {
  text?: ITextConfig;
  modalMaxWidth?: boolean;
  modalContentMaxWidth?: boolean;
}

export class ModalModel {
  public text?: TextModel;
  public modalMaxWidth: boolean = false;
  public modalContentMaxWidth: boolean = false;

  public constructor(config?: IModalConfig) {
    if (isDefined(config)) {
      this.text = isDefined(config.text) ? new TextModel(config.text) : undefined;
      this.modalMaxWidth = config.modalMaxWidth ?? false;
      this.modalContentMaxWidth = config.modalContentMaxWidth ?? false;
    }
  }
}
