import type { INavigationMenuSecondLevelConfig } from '@common/components/navigation/models/menu-second-level.config';
import { NavigationMenuSecondLevelConfig } from '@common/components/navigation/models/menu-second-level.config';
import { isEmpty } from '@common/utils/utils';
import type { INavigationBaseMenuLevelConfig } from '@common/components/navigation/models/base-menu-level.config';
import { NavigationBaseMenuLevelConfig } from '@common/components/navigation/models/base-menu-level.config';

export interface INavigationMenuFirstLevelConfig extends INavigationBaseMenuLevelConfig {
  nextLevels?: INavigationMenuSecondLevelConfig[];
}

export class NavigationMenuFirstLevelConfig extends NavigationBaseMenuLevelConfig {
  public override get isFinalActive(): boolean {
    return isEmpty(this.nextLevels) && this.isActive;
  }

  public nextLevels?: NavigationMenuSecondLevelConfig[] = [];

  constructor(config: INavigationMenuFirstLevelConfig) {
    super(config);
    this.nextLevels = (config.nextLevels ?? []).map((l) => new NavigationMenuSecondLevelConfig(l));
  }

  public isSecondLevel(): boolean {
    return !isEmpty(this.nextLevels);
  }
}
