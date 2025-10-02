import { Pipe, PipeTransform } from '@angular/core';
import { TextConfig } from '@common/models/text.config';
import { Optional } from '@common/types/optional.type';
import { TranslatePipe } from '@ngx-translate/core';

@Pipe({
  name: 'textConfigTranslate',
  pure: false,
})
export class TextConfigTranslatePipe extends TranslatePipe implements PipeTransform {
  // @ts-ignore
  public override transform(value: Optional<TextConfig> | TextConfig[]): string {
    return value instanceof Array ? value.map((v) => this._translate(v)).join(', ') : this._translate(value);
  }

  private _translate(value: Optional<TextConfig>): string {
    return value!.translate ? super.transform(value!.text, value!.params) : value!.text;
  }
}
