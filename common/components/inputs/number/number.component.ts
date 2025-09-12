import { Component, effect, input, TemplateRef } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HintComponent } from '../../hint/hint.component';
import { InputErrorComponent } from '../input-error/input-error.component';
import { TextConfigTranslatePipe } from '../../../pipes/text-config-translation.pipe';
import { ITextConfig, TextConfig } from '../../../models/text.config';
import { HintConfig } from '../../hint/models/hint.config';
import { isDefined } from '../../../utils/utils';
import { InputValidation } from '../shared/enums/input-validation.enum';
import { Optional } from '../../../types/optional.type';

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
  public formControl = input.required<FormControl<Optional<number>>>();
  public label = input.required<ITextConfig>();
  public readonly = input<boolean>(false);
  public hint = input<HintConfig>();
  public min = input<number>();
  public max = input<number>();
  public hintTemplate = input<TemplateRef<unknown>>();

  public readonly InputValidation = InputValidation;

  public innerLabel?: TextConfig;

  public constructor() {
    effect(() => {
      this.innerLabel = isDefined(this.label()) ? new TextConfig(this.label()!) : undefined;
    });
  }
}
