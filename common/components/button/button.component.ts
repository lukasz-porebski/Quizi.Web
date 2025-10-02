import { Component, effect, inject, input, output } from '@angular/core';
import { ButtonColor } from '@common/components/button/enums/color.enum';
import { MatTooltip } from '@angular/material/tooltip';
import { MatButton, MatIconButton } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
import { MatStepperNext } from '@angular/material/stepper';
import { isDefined } from '@common/utils/utils';
import { Optional } from '@common/types/optional.type';
import { TextConfigTranslatePipe } from '@common/pipes/text-config-translation.pipe';
import { ITextConfig, TextConfig } from '@common/models/text.config';
import { ButtonStyle } from '@common/components/button/enums/style.enum';
import { Icon } from '@common/enums/icon.enum';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  imports: [MatTooltip, MatButton, MatStepperNext, TextConfigTranslatePipe, MatIconButton, MatIcon],
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  public text = input<ITextConfig>();
  public color = input<ButtonColor>(ButtonColor.Primary);
  public style = input<ButtonStyle>(ButtonStyle.Filled);
  public disabled = input<boolean>();
  public matStepperNext = input<boolean>();
  public onClick = output<void>();
  public tooltip = input<ITextConfig>();
  public icon = input<Icon>();

  public innerText?: TextConfig;
  public innerTooltip?: TextConfig;

  private readonly _translatePipe = inject(TranslatePipe);

  public constructor() {
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
