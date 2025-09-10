export interface ITextConfig {
  text: string;
  params?: object;
  translate?: boolean;
}

export class TextConfig {
  public text: string;
  public params?: object;
  public translate: boolean;

  public constructor(config: ITextConfig) {
    this.text = config.text;
    this.params = config.params;
    this.translate = config.translate ?? true;
  }
}
