import { Pipe, PipeTransform } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { isEmpty } from '../utils/utils';

@Pipe({
  name: 'conditionalTranslate',
})
export class ConditionalTranslatePipe
  extends TranslatePipe
  implements PipeTransform
{
  public override transform(value: string, ...args: unknown[]): string {
    if (isEmpty(value)) {
      return value;
    }

    return !isEmpty(args) && args[0] === false ? value : super.transform(value);
  }
}
