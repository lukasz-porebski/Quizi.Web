import { Component, effect, input, TemplateRef } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HintComponent } from '../../hint/hint.component';
import { InputErrorComponent } from '../input-error/input-error.component';
import { TextConfigTranslatePipe } from '../../../pipes/text-config-translation.pipe';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TextInputType } from './enums/type.enum';
import { Icon } from '../../../enums/icon.enum';
import { ITextConfig, TextConfig } from '../../../models/text.config';
import { HintConfig } from '../../hint/models/hint.config';
import { isDefined } from '../../../utils/utils';
import { InputValidation } from '../shared/enums/input-validation.enum';
import { Optional } from '../../../types/optional.type';

@Component({
  selector: 'app-text-input',
  templateUrl: './text.component.html',
  imports: [
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    HintComponent,
    InputErrorComponent,
    TextConfigTranslatePipe,
    MatIconButton,
    MatIcon,
    MatLabel,
  ],
  styleUrls: ['./text.component.scss'],
})
export class TextInputComponent {
  public formControl = input.required<FormControl<Optional<string>>>();
  public label = input.required<ITextConfig>();
  public readonly = input<boolean>(false);
  public type = input<TextInputType>(TextInputType.Text);
  public hint = input<HintConfig>();
  public hintTemplate = input<TemplateRef<unknown>>();
  public minLength = input<number>();
  public maxLength = input<number>();
  public passwordShowButton = input<boolean>();

  public get innerType(): TextInputType {
    return this._passwordType ?? this.type();
  }

  public readonly Icon = Icon;
  public readonly InputValidation = InputValidation;

  public isPasswordHidden = true;
  public innerLabel?: TextConfig;

  private _passwordType?: TextInputType;

  public constructor() {
    effect(() => {
      this.innerLabel = isDefined(this.label())
        ? new TextConfig(this.label()!)
        : undefined;
    });
  }

  public changePasswordHideState(): void {
    this.isPasswordHidden = !this.isPasswordHidden;
    this._passwordType = this.isPasswordHidden
      ? TextInputType.Password
      : TextInputType.Text;
  }
}
