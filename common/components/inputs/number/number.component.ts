import { Component, effect, input, TemplateRef } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HintComponent } from '../../hint/hint.component';
import { InputErrorComponent } from '../input-error/input-error.component';
import { TextConfigTranslatePipe } from '../../../pipes/text-config-translation.pipe';
import { ITextConfig, TextConfig } from '../../../models/text.config';
import { HintConfig } from '../../hint/models/hint.config';
import { NumberAttribute } from '../../../attributes/number-attribute';
import { Optional } from '../../../types/optional.type';
import { isDefined } from '../../../utils/utils';

@Component({
  selector: 'app-number-input',
  templateUrl: './number.component.html',
  imports: [
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    HintComponent,
    InputErrorComponent,
    TextConfigTranslatePipe,
    MatLabel,
  ],
  styleUrls: ['./number.component.scss'],
})
export class NumberInputComponent {
  public label = input<ITextConfig>();
  public readonly = input<boolean>(false);
  public disabled = input<boolean>(false);
  public attribute = input<NumberAttribute>();
  public hint = input<HintConfig>();
  public min = input<number>();
  public max = input<number>();
  public hintTemplate = input<TemplateRef<unknown>>();

  public get formControl(): FormControl {
    return this.attribute()?.formControl ?? this._formControl;
  }

  public get innerLabel(): Optional<TextConfig> {
    return this._overideLabel ?? this.attribute()?.label;
  }

  public get innerDisabled(): boolean {
    return this.disabled() ?? this.attribute()?.formControl.disabled ?? false;
  }

  private readonly _formControl = new FormControl();

  private _overideLabel?: TextConfig;

  public constructor() {
    effect(() => {
      this._overideLabel = isDefined(this.label())
        ? new TextConfig(this.label()!)
        : undefined;
    });
  }
}
