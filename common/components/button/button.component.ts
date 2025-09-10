import { Component, effect, inject, input, output } from '@angular/core';
import { ButtonColor } from './enums/color.enum';
import { MatTooltip } from '@angular/material/tooltip';
import { MatButton } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
import { MatStepperNext } from '@angular/material/stepper';
import { isDefined } from '../../utils/utils';
import { Optional } from '../../types/optional.type';
import { TextConfigTranslatePipe } from '../../pipes/text-config-translation.pipe';
import { ITextConfig, TextConfig } from '../../models/text.config';
import { ButtonStyle } from './enums/style.enum';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  imports: [MatTooltip, MatButton, MatStepperNext, TextConfigTranslatePipe],
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  public text = input.required<ITextConfig>();
  public color = input<ButtonColor>(ButtonColor.Primary);
  public style = input<ButtonStyle>(ButtonStyle.Filled);
  public disabled = input<boolean>();
  public matStepperNext = input<boolean>();
  public onClick = output<void>();
  public tooltip = input<ITextConfig>();

  public innerText!: TextConfig;
  public innerTooltip?: TextConfig;

  private readonly _translatePipe = inject(TranslatePipe);

  public constructor() {
    effect(() => {
      this.innerText = new TextConfig(this.text());
    });
    effect(() => {
      this.innerTooltip = isDefined(this.tooltip())
        ? new TextConfig(this.tooltip()!)
        : undefined;
    });
  }

  public getText(model?: TextConfig): Optional<string> {
    if (!isDefined(model)) return null;

    return model.translate
      ? this._translatePipe.transform(model.text)
      : model.text;
  }
}
