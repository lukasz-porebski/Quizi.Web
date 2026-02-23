import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';
import type { TextConfig } from '@common/models/text.config';
import type { Optional } from '@common/types/optional.type';
import { TranslatePipe } from '@ngx-translate/core';
import { isDefined } from 'remeda';

@Pipe({
  name: 'textConfigTranslate',
  pure: false,
})
export class TextConfigTranslatePipe extends TranslatePipe implements PipeTransform {
  // @ts-expect-error: TS2416 - signature mismatch with base TranslatePipe
  public override transform(value: Optional<TextConfig> | TextConfig[]): string {
    if (!isDefined(value)) {
      return '';
    }

    return value instanceof Array ? value.map((v) => this._translate(v)).join(', ') : this._translate(value);
  }

  private _translate(value: Optional<TextConfig>): string {
    return value!.translate ? super.transform(value!.text, value!.params) : value!.text;
  }
}
