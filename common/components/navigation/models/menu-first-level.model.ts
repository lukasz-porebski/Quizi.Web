import { MenuSecondLevelModel } from './menu-second-level.model';
import { isEmpty, replaceIfNotDefined } from '../../../utils/utils';
import { MenuLevelModel } from './menu-level.model';
import { Icon } from '../../../enums/icon.enum';
import { TranslationKey } from '../../../types/translation.type';

export class MenuFirstLevelModel extends MenuLevelModel {
  public override get isFianlActive(): boolean {
    return isEmpty(this.nextLevels) && this.isActive;
  }

  public nextLevels?: MenuSecondLevelModel[] = [];

  public constructor(
    text: TranslationKey,
    navigateUrl?: string,
    icon?: Icon,
    secondLevels?: MenuSecondLevelModel[],
  ) {
    super(text, navigateUrl, icon);
    this.nextLevels = replaceIfNotDefined(secondLevels, []);
  }

  public isSecondLevel(): boolean {
    return !isEmpty(this.nextLevels);
  }
}
