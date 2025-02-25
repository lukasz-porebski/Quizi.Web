import { HintAligne } from '../enums/align.enum';
import { ITextConfig, TextConfig } from '../../../models/text.config';

export interface IHintConfig {
  hint: ITextConfig;
  hintAlign?: HintAligne;
}

export class HintConfig {
  public hint: TextConfig;
  public align: HintAligne;

  public constructor(config: IHintConfig) {
    this.hint = new TextConfig(config.hint);
    this.align = config.hintAlign ?? HintAligne.Start;
  }
}
