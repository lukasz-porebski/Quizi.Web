import { Component, effect, input, TemplateRef } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
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
import { TextAttribute } from '../../../attributes/text-attribute';
import { isDefined } from '../../../utils/utils';
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
  ],
  styleUrls: ['./text.component.scss'],
})
export class TextInputComponent {
  public label = input<ITextConfig>();
  public readonly = input<boolean>(false);
  public disabled = input<boolean>(false);
  public type = input<TextInputType>(TextInputType.Text);
  public attribute = input<TextAttribute>();
  public hint = input<HintConfig>();
  public hintTemplate = input<TemplateRef<unknown>>();
  public minLength = input<number>();
  public maxLength = input<number>();
  public passwordShowButton = input<boolean>();

  public get formControl(): FormControl {
    return this.attribute()?.formControl ?? this._formControl;
  }

  public get innerLabel(): Optional<TextConfig> {
    return this._overideLabel ?? this.attribute()?.label;
  }

  public get innerDisabled(): boolean {
    return this.disabled() ?? this.attribute()?.formControl.disabled ?? false;
  }

  public get innerType(): TextInputType {
    return this._passwordType ?? this.type();
  }

  public readonly Icon = Icon;

  public isPasswordHidden = true;

  private _overideLabel?: TextConfig;
  private _passwordType?: TextInputType;

  private readonly _formControl = new FormControl();

  public constructor() {
    effect(() => {
      this._overideLabel = isDefined(this.label())
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
