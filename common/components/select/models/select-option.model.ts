import { ITextConfig, TextConfig } from '../../../models/text.config';

export class SelectOptionModel<TData> {
  public readonly text: TextConfig;
  public readonly data: TData;

  public constructor(text: ITextConfig, data: TData) {
    this.text = new TextConfig(text);
    this.data = data;
  }
}
