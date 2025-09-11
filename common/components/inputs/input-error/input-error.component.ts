import { Component, effect, input } from '@angular/core';
import { MatError } from '@angular/material/form-field';
import { ITextConfig, TextConfig } from '../../../models/text.config';
import { isDefined, isEmpty } from '../../../utils/utils';
import { TextConfigTranslatePipe } from '../../../pipes/text-config-translation.pipe';

@Component({
  selector: 'app-input-error',
  imports: [MatError, TextConfigTranslatePipe],
  templateUrl: './input-error.component.html',
  styleUrl: './input-error.component.scss',
})
export class InputErrorComponent {
  public message = input<ITextConfig>();

  public get isMessageEmpty(): boolean {
    return isEmpty(this.message()?.text);
  }

  public innerMessage?: TextConfig;

  public constructor() {
    effect(() => {
      this.innerMessage = isDefined(this.message()) ? new TextConfig(this.message()!) : undefined;
    });
  }
}
