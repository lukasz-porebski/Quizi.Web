import type { TemplateRef } from '@angular/core';
import { Component, effect, input } from '@angular/core';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import type { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HintComponent } from '@common/components/hint/hint.component';
import { TextConfigTranslatePipe } from '@common/pipes/text-config-translation.pipe';
import type { ITextConfig } from '@common/models/text.config';
import { TextConfig } from '@common/models/text.config';
import type { HintConfig } from '@common/components/hint/models/hint.config';
import { isDefined } from '@common/utils/utils';
import { InputValidation } from '@common/components/inputs/shared/enums/input-validation.enum';
import type { Optional } from '@common/types/optional.type';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-number-input',
  templateUrl: './number.component.html',
  imports: [
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    HintComponent,
    TextConfigTranslatePipe,
    MatLabel,
    MatError,
    TranslatePipe,
  ],
  styleUrls: ['./number.component.scss'],
})
export class NumberInputComponent {
  public readonly formControl = input.required<FormControl<Optional<number>>>();
  public readonly label = input.required<ITextConfig>();
  public readonly readonly = input<boolean>(false);
  public readonly hint = input<HintConfig>();
  public readonly min = input<number>();
  public readonly max = input<number>();
  public readonly hintTemplate = input<TemplateRef<unknown>>();

  public readonly InputValidation = InputValidation;

  public innerLabel?: TextConfig;

  constructor() {
    effect(() => {
      this.innerLabel = isDefined(this.label()) ? new TextConfig(this.label()) : undefined;
    });
  }
}
