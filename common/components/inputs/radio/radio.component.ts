import { Component, effect, input } from '@angular/core';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatLabel } from '@angular/material/form-field';
import { TextConfigTranslatePipe } from '../../../pipes/text-config-translation.pipe';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputColor } from '../shared/enums/input-color.enum';
import { ConditionalTranslatePipe } from '../../../pipes/conditional-translation.pipe';
import { isDefined } from '../../../utils/utils';
import { ITextConfig, TextConfig } from '../../../models/text.config';
import { RadioLabelPosition } from './enums/label-position.enum';

@Component({
  selector: 'app-radio',
  imports: [
    MatRadioGroup,
    MatLabel,
    TextConfigTranslatePipe,
    ReactiveFormsModule,
    MatRadioButton,
    ConditionalTranslatePipe,
  ],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss',
})
export class RadioComponent<T> {
  public formControl = input.required<FormControl<T>>();
  public options = input.required<T[]>();
  public label = input<ITextConfig>();
  public readonly = input<boolean>(false);
  public optionLabelPosition = input<RadioLabelPosition>(RadioLabelPosition.After);
  public translateOptionLabel = input<boolean>(false);
  public color = input<InputColor>(InputColor.Default);
  public optionText = input<(option: T) => string>();

  public getRadioButtonColorClass(color: InputColor): string {
    return 'app-radio-button-' + color;
  }

  public getOptionText(option: T): string {
    return isDefined(this.optionText()) ? this.optionText()!(option) : (option?.toString() ?? '');
  }

  public innerLabel?: TextConfig;

  public constructor() {
    effect(() => {
      this.innerLabel = isDefined(this.label()) ? new TextConfig(this.label()!) : undefined;
    });
  }
}
