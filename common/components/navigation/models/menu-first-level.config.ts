import {
  INavigationMenuSecondLevelConfig,
  NavigationMenuSecondLevelConfig,
} from './menu-second-level.config';
import { isEmpty } from '../../../utils/utils';
import {
  INavigationBaseMenuLevelConfig,
  NavigationBaseMenuLevelConfig,
} from './base-menu-level.config';

export interface INavigationMenuFirstLevelConfig
  extends INavigationBaseMenuLevelConfig {
  nextLevels?: INavigationMenuSecondLevelConfig[];
}

export class NavigationMenuFirstLevelConfig extends NavigationBaseMenuLevelConfig {
  public override get isFianlActive(): boolean {
    return isEmpty(this.nextLevels) && this.isActive;
  }

  public nextLevels?: NavigationMenuSecondLevelConfig[] = [];

  public constructor(config: INavigationMenuFirstLevelConfig) {
    super(config);
    this.nextLevels = (config.nextLevels ?? []).map(
      (l) => new NavigationMenuSecondLevelConfig(l),
    );
  }

  public isSecondLevel(): boolean {
    return !isEmpty(this.nextLevels);
  }
}
