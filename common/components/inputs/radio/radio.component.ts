import { Component, effect, input, TemplateRef } from '@angular/core';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatLabel } from '@angular/material/form-field';
import { TextConfigTranslatePipe } from '../../../pipes/text-config-translation.pipe';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputColor } from '../shared/enums/input-color.enum';
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
    NgTemplateOutlet,
  ],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss',
})
export class RadioComponent<TData, TValue = TData> {
  public formControl = input<FormControl<TValue>>();
  public value = input<TValue>();
  public options = input.required<TData[]>();
  public label = input<ITextConfig>();
  public optionTemplate = input<TemplateRef<any>>();
  public readonly = input<boolean>(false);
  public optionLabelPosition = input<RadioLabelPosition>(RadioLabelPosition.After);
  public translateOptionLabel = input<boolean>(false);
  public color = input<InputColor>(InputColor.Default);
  public optionText = input<(option: TData) => string | TextConfig>();
  public optionValue = input<(option: TData) => TValue>();
  public disableLabelClick = input<boolean>(false);
  public vertical = input<boolean>(true);

  public getRadioButtonColorClass(color: InputColor): string {
    return 'app-radio-button-' + color;
  }

  public getOptionText(option: TData): TextConfig {
    if (!isDefined(this.optionText())) {
      return new TextConfig({ text: option?.toString() ?? '', translate: false });
    }

    const text = this.optionText()!(option);
    return text instanceof TextConfig
      ? text
      : new TextConfig({ text: text, translate: this.translateOptionLabel() });
  }

  public getOptionValue(option: TData): TValue {
    return isDefined(this.optionValue()) ? this.optionValue()!(option) : (option as unknown as TValue);
  }

  public innerFormControl!: FormControl<TValue>;
  public innerLabel?: TextConfig;

  public constructor() {
    effect(() => {
      this.innerLabel = isDefined(this.label()) ? new TextConfig(this.label()!) : undefined;
    });

    effect(() => {
      if (isDefined(this.formControl())) {
        this.innerFormControl = this.formControl()!;
      } else {
        this.innerFormControl = isDefined(this.value())
          ? new FormControl({
              value: this.value()!,
              disabled: false,
            })
          : new FormControl();
      }
    });
  }
}
