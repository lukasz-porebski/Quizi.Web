import { MenuThirdLevelModel } from './menu-third-level.model';
import { isEmpty, replaceIfNotDefined } from '../../../utils/utils';
import { MenuLevelModel } from './menu-level.model';
import { Icon } from '../../../enums/icon.enum';
import { TranslationKey } from '../../../types/translation.type';

export class MenuSecondLevelModel extends MenuLevelModel {
  public override get isFianlActive(): boolean {
    return isEmpty(this.nextLevels) && this.isActive;
  }

  public nextLevels?: MenuThirdLevelModel[];

  public constructor(
    text: TranslationKey,
    navigateUrl?: string,
    icon?: Icon,
    thirdLevels?: MenuThirdLevelModel[],
  ) {
    super(text, navigateUrl, icon);
    this.nextLevels = replaceIfNotDefined(thirdLevels, []);
  }

  public isThirdLevel(): boolean {
    return isEmpty(this.nextLevels);
  }
}
