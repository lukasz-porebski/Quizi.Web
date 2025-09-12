import { Component, effect, input, TemplateRef } from '@angular/core';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatLabel } from '@angular/material/form-field';
import { TextConfigTranslatePipe } from '../../../pipes/text-config-translation.pipe';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputColor } from '../shared/enums/input-color.enum';
import { ConditionalTranslatePipe } from '../../../pipes/conditional-translation.pipe';
import { isDefined } from '../../../utils/utils';
import { ITextConfig, TextConfig } from '../../../models/text.config';
import { RadioLabelPosition } from './enums/label-position.enum';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-radio',
  imports: [
    MatRadioGroup,
    MatLabel,
    TextConfigTranslatePipe,
    ReactiveFormsModule,
    MatRadioButton,
    ConditionalTranslatePipe,
    NgTemplateOutlet,
  ],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss',
})
export class RadioComponent<TData, TValue = TData> {
  public formControl = input.required<FormControl<TValue>>();
  public options = input.required<TData[]>();
  public label = input<ITextConfig>();
  public optionTemplate = input<TemplateRef<any>>();
  public readonly = input<boolean>(false);
  public optionLabelPosition = input<RadioLabelPosition>(RadioLabelPosition.After);
  public translateOptionLabel = input<boolean>(false);
  public color = input<InputColor>(InputColor.Default);
  public optionText = input<(option: TData) => string>();
  public optionValue = input<(option: TData) => TValue>();
  public disableLabelClick = input<boolean>(false);

  public getRadioButtonColorClass(color: InputColor): string {
    return 'app-radio-button-' + color;
  }

  public getOptionText(option: TData): string {
    return isDefined(this.optionText()) ? this.optionText()!(option) : (option?.toString() ?? '');
  }

  public getOptionValue(option: TData): TValue {
    return isDefined(this.optionValue()) ? this.optionValue()!(option) : (option as unknown as TValue);
  }

  public innerLabel?: TextConfig;

  public constructor() {
    effect(() => {
      this.innerLabel = isDefined(this.label()) ? new TextConfig(this.label()!) : undefined;
    });
  }
}
