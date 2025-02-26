import { Component, input, TemplateRef } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { TextAreaConfig } from './models/text-area.config';
import { TextConfigTranslatePipe } from '../../../pipes/text-config-translation.pipe';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatInput } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { HintComponent } from '../../hint/hint.component';
import { InputErrorComponent } from '../input-error/input-error.component';

@Component({
  selector: 'app-text-area',
  imports: [
    MatFormField,
    TextConfigTranslatePipe,
    CdkTextareaAutosize,
    MatInput,
    ReactiveFormsModule,
    HintComponent,
    InputErrorComponent,
  ],
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.scss',
})
export class TextAreaComponent {
  public config = input.required<TextAreaConfig>();
  public hintTemplate = input<TemplateRef<unknown>>();
}
