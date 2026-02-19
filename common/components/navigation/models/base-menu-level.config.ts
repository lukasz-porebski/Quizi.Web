import { Icon } from '@common/enums/icon.enum';
import { TranslationKey } from '@common/types/translation.type';
import { Permission } from '@app/core/enums/permission.enum';

export interface INavigationBaseMenuLevelConfig {
  text: TranslationKey;
  navigateUrl?: string;
  icon?: Icon;
  permissions?: Permission[];
}

export abstract class NavigationBaseMenuLevelConfig {
  public get isFianlActive(): boolean {
    return false;
  }

  public text: TranslationKey;
  public navigateUrl?: string;
  public icon?: Icon;
  public isActive = false;
  public permissions: Permission[] = [];

  protected constructor(config: INavigationBaseMenuLevelConfig) {
    this.text = config.text;
    this.navigateUrl = config.navigateUrl;
    this.icon = config.icon;
    this.permissions = config.permissions ?? [];
  }
}
