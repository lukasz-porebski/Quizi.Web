import { Pipe, PipeTransform } from '@angular/core';
import { TextConfig } from '../models/text.config';
import { Optional } from '../types/optional.type';
import { TranslatePipe } from '@ngx-translate/core';

@Pipe({
  name: 'textConfigTranslate',
  pure: false,
})
export class TextConfigTranslatePipe
  extends TranslatePipe
  implements PipeTransform
{
  // @ts-ignore
  public override transform(value: Optional<TextConfig>): string {
    return value!.translate
      ? super.transform(value!.text, value!.params)
      : value!.text;
  }
}
