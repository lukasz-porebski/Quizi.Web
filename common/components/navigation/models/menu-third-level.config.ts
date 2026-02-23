import type { INavigationBaseMenuLevelConfig } from '@common/components/navigation/models/base-menu-level.config';
import { NavigationBaseMenuLevelConfig } from '@common/components/navigation/models/base-menu-level.config';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface INavigationMenuThirdLevelConfig extends INavigationBaseMenuLevelConfig {}

export class NavigationMenuThirdLevelConfig extends NavigationBaseMenuLevelConfig {
  public override get isFinalActive(): boolean {
    return this.isActive;
  }

  constructor(config: INavigationMenuThirdLevelConfig) {
    super(config);
  }
}
