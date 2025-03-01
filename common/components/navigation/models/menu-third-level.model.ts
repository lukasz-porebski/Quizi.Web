import { MenuLevelModel } from './menu-level.model';
import { Icon } from '../../../enums/icon.enum';
import { TranslationKey } from '../../../types/translation.type';

export class MenuThirdLevelModel extends MenuLevelModel {
  public override get isFianlActive(): boolean {
    return this.isActive;
  }

  public constructor(text: TranslationKey, navigateUrl?: string, icon?: Icon) {
    super(text, navigateUrl, icon);
  }
}
