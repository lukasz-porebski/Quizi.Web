import { Icon } from '@common/enums/icon.enum';
import { TranslationKey } from '@common/types/translation.type';

export interface INavigationBaseMenuLevelConfig {
  text: TranslationKey;
  navigateUrl?: string;
  icon?: Icon;
}

export abstract class NavigationBaseMenuLevelConfig {
  public get isFianlActive(): boolean {
    return false;
  }

  public text: TranslationKey;
  public navigateUrl?: string;
  public icon?: Icon;
  public isActive = false;

  protected constructor(config: INavigationBaseMenuLevelConfig) {
    this.text = config.text;
    this.navigateUrl = config.navigateUrl;
    this.icon = config.icon;
  }
}
