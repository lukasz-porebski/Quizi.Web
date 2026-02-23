import type { TemplateRef } from '@angular/core';
import { Component, effect, input } from '@angular/core';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatLabel } from '@angular/material/form-field';
import { TextConfigTranslatePipe } from '@common/pipes/text-config-translation.pipe';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputColor } from '@common/components/inputs/shared/enums/input-color.enum';
import { isDefined } from '@common/utils/utils';
import type { ITextConfig } from '@common/models/text.config';
import { TextConfig } from '@common/models/text.config';
import { RadioLabelPosition } from '@common/components/inputs/radio/enums/label-position.enum';
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
  public readonly formControl = input<FormControl<TValue>>();
  public readonly value = input<TValue>();
  public readonly options = input.required<TData[]>();
  public readonly label = input<ITextConfig>();
  public readonly optionTemplate = input<TemplateRef<unknown>>();
  public readonly readonly = input<boolean>(false);
  public readonly optionLabelPosition = input<RadioLabelPosition>(RadioLabelPosition.After);
  public readonly translateOptionLabel = input<boolean>(false);
  public readonly optionText = input<(option: TData) => string | TextConfig>();
  public readonly optionValue = input<(option: TData) => TValue>();
  public readonly optionColor = input<(option: TData) => InputColor>(() => InputColor.Default);
  public readonly disableLabelClick = input<boolean>(false);
  public readonly vertical = input<boolean>(true);

  public innerFormControl!: FormControl<TValue>;
  public innerLabel?: TextConfig;

  constructor() {
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

  public getRadioButtonColorClass(option: TData): string {
    return 'radio-button-' + this.optionColor()(option);
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
}
