import { Component, input } from '@angular/core';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { RadioConfig } from './models/radio.config';
import { MatLabel } from '@angular/material/form-field';
import { TextConfigTranslatePipe } from '../../../pipes/text-config-translation.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { InputColor } from '../shared/enums/input-color.enum';
import { ConditionalTranslatePipe } from '../../../pipes/conditional-translation.pipe';
import { isDefined } from '../../../utils/utils';

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
  public config = input.required<RadioConfig<T>>();

  public getRadioButtonColorClass(color: InputColor): string {
    return 'app-radio-button-' + color;
  }

  public getOptionText(option: T): string | T {
    return isDefined(this.config().optionText) ? this.config().optionText!(option) : option;
  }
}
