export interface IAppText {
  text: string;
  translate?: boolean;
}

export class AppTextModel {
  public text: string;
  public translate: boolean;

  public constructor(configuration: IAppText) {
    this.text = configuration.text;
    this.translate = configuration.translate ?? true;
  }
}
