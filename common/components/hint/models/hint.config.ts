import { HintAligne } from '@common/components/hint/enums/align.enum';
import type { ITextConfig } from '@common/models/text.config';
import { TextConfig } from '@common/models/text.config';

export interface IHintConfig {
  hint: ITextConfig;
  hintAlign?: HintAligne;
}

export class HintConfig {
  public hint: TextConfig;
  public align: HintAligne;

  constructor(config: IHintConfig) {
    this.hint = new TextConfig(config.hint);
    this.align = config.hintAlign ?? HintAligne.Start;
  }
}
