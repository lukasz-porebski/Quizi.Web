import {
  INavigationMenuFirstLevelConfig,
  NavigationMenuFirstLevelConfig,
} from '@common/components/navigation/models/menu-first-level.config';

export interface INavigationConfig {
  logoPath: string;
  menu: INavigationMenuFirstLevelConfig[];
}

export class NavigationConfig {
  public logoPath: string;
  public menu: NavigationMenuFirstLevelConfig[];

  public constructor(config: INavigationConfig) {
    this.logoPath = config.logoPath;
    this.menu = config.menu.map((m) => new NavigationMenuFirstLevelConfig(m));
  }
}
