import { Component, input, TemplateRef } from '@angular/core';
import { TextInputConfig } from './models/text-input.config';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { HintComponent } from '../../hint/hint.component';
import { InputErrorComponent } from '../input-error/input-error.component';
import { TextConfigTranslatePipe } from '../../../pipes/text-config-translation.pipe';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TextInputType } from './enums/type.enum';
import { Icon } from '../../../enums/icon.enum';

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
    MatIcon
  ],
  styleUrls: [ './text.component.scss' ]
})
export class AppTextInputComponent {
  public config = input.required<TextInputConfig>();
  public hintTemplate = input<TemplateRef<unknown>>();

  public readonly Icon = Icon;

  public isPasswordHidden = true;

  public changePasswordHideState(): void {
    this.isPasswordHidden = !this.isPasswordHidden;
    this.config().type = this.isPasswordHidden ? TextInputType.Password : TextInputType.Text;
  }
}
