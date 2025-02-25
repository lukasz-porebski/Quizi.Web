import { Component, input, TemplateRef } from '@angular/core';
import { NumberInputConfig } from './models/number.config';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { HintComponent } from '../../hint/hint.component';
import { InputErrorComponent } from '../input-error/input-error.component';
import { TextConfigTranslatePipe } from '../../../pipes/text-config-translation.pipe';

@Component({
  selector: 'app-number-input',
  templateUrl: './number.component.html',
  imports: [
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    HintComponent,
    InputErrorComponent,
    TextConfigTranslatePipe
  ],
  styleUrls: [ './number.component.scss' ]
})
export class NumberInputComponent {
  public config = input.required<NumberInputConfig>();
  public hintTemplate = input<TemplateRef<unknown>>();
}
