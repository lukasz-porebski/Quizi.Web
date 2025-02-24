import { SelectAttribute } from '../../../attributes/select/select-attribute';
import { ITextConfig, TextModel } from '../../../models/text.model';

export interface ISelectConfig {
  label: ITextConfig;
  attribute: SelectAttribute<any>;
  maxWidth?: boolean;
}

export class SelectModel {
  public readonly label: TextModel;
  public readonly attribute: SelectAttribute<any>;
  public readonly maxWidth: boolean;

  public constructor(configuration: ISelectConfig) {
    this.label = new TextModel(configuration.label);
    this.attribute = configuration.attribute;
    this.maxWidth = configuration.maxWidth ?? false;
  }
}
