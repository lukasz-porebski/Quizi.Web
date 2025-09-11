import { Component, effect, input, TemplateRef } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HintComponent } from '../../hint/hint.component';
import { InputErrorComponent } from '../input-error/input-error.component';
import { TextConfigTranslatePipe } from '../../../pipes/text-config-translation.pipe';
import { Icon } from '../../../enums/icon.enum';
import { ITextConfig, TextConfig } from '../../../models/text.config';
import { HintConfig } from '../../hint/models/hint.config';
import { isDefined } from '../../../utils/utils';
import { InputValidation } from '../shared/enums/input-validation.enum';
import { Optional } from '../../../types/optional.type';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
  selector: 'app-textarea-input',
  templateUrl: './textarea.component.html',
  imports: [
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    HintComponent,
    InputErrorComponent,
    TextConfigTranslatePipe,
    MatLabel,
    CdkTextareaAutosize,
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
