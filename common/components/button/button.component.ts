import { Component, inject, input } from '@angular/core';
import { ButtonConfig } from './models/button.config';
import { ButtonColor } from './enums/color.enum';
import { MatTooltip } from '@angular/material/tooltip';
import { MatButton } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
import { MatStepperNext } from '@angular/material/stepper';
import { TextConfig } from '../../models/text.config';
import { isDefined } from '../../utils/utils';
import { Optional } from '../../types/optional.type';
import { TextConfigTranslatePipe } from '../../pipes/text-config-translation.pipe';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  imports: [MatTooltip, MatButton, MatStepperNext, TextConfigTranslatePipe],
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  public config = input.required<ButtonConfig>();

  public get matColor(): string {
    return this.config().color === ButtonColor.Accent ||
      this.config().color === ButtonColor.Primary
      ? this.config().color
      : '';
  }

  private readonly _translatePipe = inject(TranslatePipe);

  public getText(model?: TextConfig): Optional<string> {
    if (!isDefined(model)) return null;

    return model.translate
      ? this._translatePipe.transform(model.text)
      : model.text;
  }
}
