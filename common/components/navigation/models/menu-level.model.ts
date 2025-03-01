import { Icon } from '../../../enums/icon.enum';
import { TranslationKey } from '../../../types/translation.type';

export class MenuLevelModel {
  public get isFianlActive(): boolean {
    return false;
  }

  public text: TranslationKey;
  public navigateUrl?: string;
  public icon?: Icon;
  public isActive = false;

  public constructor(text: TranslationKey, navigateUrl?: string, icon?: Icon) {
    this.text = text;
    this.navigateUrl = navigateUrl;
    this.icon = icon;
  }
}
