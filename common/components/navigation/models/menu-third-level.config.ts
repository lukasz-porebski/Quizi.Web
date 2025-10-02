import {
  INavigationBaseMenuLevelConfig,
  NavigationBaseMenuLevelConfig,
} from '@common/components/navigation/models/base-menu-level.config';

export interface INavigationMenuThirdLevelConfig extends INavigationBaseMenuLevelConfig {}

export class NavigationMenuThirdLevelConfig extends NavigationBaseMenuLevelConfig {
  public override get isFianlActive(): boolean {
    return this.isActive;
  }

  public constructor(config: INavigationMenuThirdLevelConfig) {
    super(config);
  }
}
