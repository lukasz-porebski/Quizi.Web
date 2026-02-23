import type { ITextConfig } from '@common/models/text.config';
import { TextConfig } from '@common/models/text.config';

export class SelectOptionModel<TData> {
  public readonly text: TextConfig;
  public readonly data: TData;

  constructor(text: ITextConfig, data: TData) {
    this.text = new TextConfig(text);
    this.data = data;
  }
}
