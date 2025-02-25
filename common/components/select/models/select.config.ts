import { SelectAttribute } from '../../../attributes/select/select-attribute';
import { ITextConfig, TextConfig } from '../../../models/text.config';

export interface ISelectConfig {
  label: ITextConfig;
  attribute: SelectAttribute<any>;
  maxWidth?: boolean;
}

export class SelectConfig {
  public label: TextConfig;
  public attribute: SelectAttribute<any>;
  public maxWidth: boolean;

  public constructor(configuration: ISelectConfig) {
    this.label = new TextConfig(configuration.label);
    this.attribute = configuration.attribute;
    this.maxWidth = configuration.maxWidth ?? false;
  }
}
