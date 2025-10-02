import { Component, effect, input, TemplateRef } from '@angular/core';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HintComponent } from '@common/components/hint/hint.component';
import { TextConfigTranslatePipe } from '@common/pipes/text-config-translation.pipe';
import { Icon } from '@common/enums/icon.enum';
import { ITextConfig, TextConfig } from '@common/models/text.config';
import { HintConfig } from '@common/components/hint/models/hint.config';
import { isDefined } from '@common/utils/utils';
import { InputValidation } from '@common/components/inputs/shared/enums/input-validation.enum';
import { Optional } from '@common/types/optional.type';
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
  public formControl = input.required<FormControl<Optional<string>>>();
  public label = input.required<ITextConfig>();
  public readonly = input<boolean>(false);
  public hint = input<HintConfig>();
  public hintTemplate = input<TemplateRef<unknown>>();
  public minLength = input<number>();
  public maxLength = input<number>();
  public minRows = input<number>();
  public maxRows = input<number>();
  public noOverflow = input<boolean>(false);

  public readonly Icon = Icon;
  public readonly InputValidation = InputValidation;

  public innerLabel?: TextConfig;

  public constructor() {
    effect(() => {
      this.innerLabel = isDefined(this.label()) ? new TextConfig(this.label()!) : undefined;
    });
  }
}
