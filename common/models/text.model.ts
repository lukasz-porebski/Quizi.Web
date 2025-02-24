export interface ITextConfig {
  text: string;
  translate?: boolean;
}

export class TextModel {
  public text: string;
  public translate: boolean;

  public constructor(config: ITextConfig) {
    this.text = config.text;
    this.translate = config.translate ?? true;
  }
}
