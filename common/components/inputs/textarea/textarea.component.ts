import type { TemplateRef } from '@angular/core';
import { Component, effect, input } from '@angular/core';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import type { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HintComponent } from '@common/components/hint/hint.component';
import { TextConfigTranslatePipe } from '@common/pipes/text-config-translation.pipe';
import { Icon } from '@common/enums/icon.enum';
import type { ITextConfig } from '@common/models/text.config';
import { TextConfig } from '@common/models/text.config';
import type { HintConfig } from '@common/components/hint/models/hint.config';
import { isDefined } from '@common/utils/utils';
import { InputValidation } from '@common/components/inputs/shared/enums/input-validation.enum';
import type { Optional } from '@common/types/optional.type';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-textarea-input',
  templateUrl: './textarea.component.html',
  imports: [
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    HintComponent,
    TextConfigTranslatePipe,
    MatLabel,
    CdkTextareaAutosize,
    MatError,
    TranslatePipe,
  ],
  styleUrls: ['./textarea.component.scss'],
})
export class TextareaInputComponent {
  public readonly formControl = input.required<FormControl<Optional<string>>>();
  public readonly label = input.required<ITextConfig>();
  public readonly readonly = input<boolean>(false);
  public readonly hint = input<HintConfig>();
  public readonly hintTemplate = input<TemplateRef<unknown>>();
  public readonly minLength = input<number>();
  public readonly maxLength = input<number>();
  public readonly minRows = input<number>();
  public readonly maxRows = input<number>();
  public readonly noOverflow = input<boolean>(false);

  public readonly Icon = Icon;
  public readonly InputValidation = InputValidation;

  public innerLabel?: TextConfig;

  constructor() {
    effect(() => {
      this.innerLabel = isDefined(this.label()) ? new TextConfig(this.label()) : undefined;
    });
  }
}
