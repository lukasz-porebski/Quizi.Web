import { INavigationMenuThirdLevelConfig, NavigationMenuThirdLevelConfig } from './menu-third-level.config';
import { isEmpty } from '../../../utils/utils';
import { INavigationBaseMenuLevelConfig, NavigationBaseMenuLevelConfig } from './base-menu-level.config';

export interface INavigationMenuSecondLevelConfig extends INavigationBaseMenuLevelConfig {
  nextLevels?: INavigationMenuThirdLevelConfig[];
}

export class NavigationMenuSecondLevelConfig extends NavigationBaseMenuLevelConfig {
  public override get isFianlActive(): boolean {
    return isEmpty(this.nextLevels) && this.isActive;
  }

  public nextLevels?: NavigationMenuThirdLevelConfig[];

  public constructor(config: INavigationMenuSecondLevelConfig) {
    super(config);
    this.nextLevels = (config.nextLevels ?? []).map((l) => new NavigationMenuThirdLevelConfig(l));
  }

  public isThirdLevel(): boolean {
    return isEmpty(this.nextLevels);
  }
}
