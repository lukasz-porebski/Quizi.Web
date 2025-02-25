import { inject, Pipe, PipeTransform } from '@angular/core';
import { isEmpty } from '../utils/utils';
import { TextConfig } from '../models/text.config';
import { Optional } from '../types/optional.type';
import { TranslatePipe } from '@ngx-translate/core';

@Pipe({
  name: 'textConfigTranslate'
})
export class TextConfigTranslatePipe implements PipeTransform {
  private readonly _translatePipe = inject(TranslatePipe)

  public transform(value: Optional<TextConfig>): string {
    if (isEmpty(value?.text)) {
      return '';
    }

    return value!.translate ? this._translatePipe.transform(value!.text) : value;
  }
}
