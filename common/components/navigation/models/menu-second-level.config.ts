import type { INavigationMenuThirdLevelConfig } from '@common/components/navigation/models/menu-third-level.config';
import { NavigationMenuThirdLevelConfig } from '@common/components/navigation/models/menu-third-level.config';
import { isEmpty } from '@common/utils/utils';
import type { INavigationBaseMenuLevelConfig } from '@common/components/navigation/models/base-menu-level.config';
import { NavigationBaseMenuLevelConfig } from '@common/components/navigation/models/base-menu-level.config';

export interface INavigationMenuSecondLevelConfig extends INavigationBaseMenuLevelConfig {
  nextLevels?: INavigationMenuThirdLevelConfig[];
}

export class NavigationMenuSecondLevelConfig extends NavigationBaseMenuLevelConfig {
  public override get isFinalActive(): boolean {
    return isEmpty(this.nextLevels) && this.isActive;
  }

  public nextLevels?: NavigationMenuThirdLevelConfig[];

  constructor(config: INavigationMenuSecondLevelConfig) {
    super(config);
    this.nextLevels = (config.nextLevels ?? []).map((l) => new NavigationMenuThirdLevelConfig(l));
  }

  public isThirdLevel(): boolean {
    return isEmpty(this.nextLevels);
  }
}
