import { Component, effect, input, TemplateRef } from '@angular/core';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HintComponent } from '@common/components/hint/hint.component';
import { TextConfigTranslatePipe } from '@common/pipes/text-config-translation.pipe';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TextInputType } from '@common/components/inputs/text/enums/type.enum';
import { Icon } from '@common/enums/icon.enum';
import { ITextConfig, TextConfig } from '@common/models/text.config';
import { HintConfig } from '@common/components/hint/models/hint.config';
import { isDefined } from '@common/utils/utils';
import { InputValidation } from '@common/components/inputs/shared/enums/input-validation.enum';
import { Optional } from '@common/types/optional.type';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-text-input',
  templateUrl: './text.component.html',
  imports: [
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    HintComponent,
    TextConfigTranslatePipe,
    MatIconButton,
    MatIcon,
    MatLabel,
    MatError,
    TranslatePipe,
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
      this.innerLabel = isDefined(this.label()) ? new TextConfig(this.label()!) : undefined;
    });
  }

  public changePasswordHideState(): void {
    this.isPasswordHidden = !this.isPasswordHidden;
    this._passwordType = this.isPasswordHidden ? TextInputType.Password : TextInputType.Text;
  }
}
