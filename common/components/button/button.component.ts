import { Component, effect, inject, input, output } from '@angular/core';
import { ButtonColor } from '@common/components/button/enums/color.enum';
import { MatTooltip } from '@angular/material/tooltip';
import { MatButton, MatIconButton } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
import { MatStepperNext } from '@angular/material/stepper';
import { isDefined } from '@common/utils/utils';
import type { Optional } from '@common/types/optional.type';
import { TextConfigTranslatePipe } from '@common/pipes/text-config-translation.pipe';
import type { ITextConfig } from '@common/models/text.config';
import { TextConfig } from '@common/models/text.config';
import { ButtonStyle } from '@common/components/button/enums/style.enum';
import type { Icon } from '@common/enums/icon.enum';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  imports: [MatTooltip, MatButton, MatStepperNext, TextConfigTranslatePipe, MatIconButton, MatIcon],
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  public readonly text = input<ITextConfig>();
  public readonly color = input<ButtonColor>(ButtonColor.Primary);
  public readonly style = input<ButtonStyle>(ButtonStyle.Filled);
  public readonly disabled = input<boolean>();
  public readonly matStepperNext = input<boolean>();
  public readonly clicked = output<void>();
  public readonly tooltip = input<ITextConfig>();
  public readonly icon = input<Icon>();

  private readonly _translatePipe = inject(TranslatePipe);

  public innerText?: TextConfig;
  public innerTooltip?: TextConfig;

  constructor() {
    effect(() => {
      this.innerText = isDefined(this.text()) ? new TextConfig(this.text()!) : undefined;
    });
    effect(() => {
      this.innerTooltip = isDefined(this.tooltip()) ? new TextConfig(this.tooltip()!) : undefined;
    });
  }

  public getText(model?: TextConfig): Optional<string> {
    if (!isDefined(model)) return null;

    return model.translate ? this._translatePipe.transform(model.text) : model.text;
  }
}
