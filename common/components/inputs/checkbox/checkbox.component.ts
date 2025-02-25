import { Component, input } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxConfig } from './models/checkbox.config';
import { InputColor } from '../shared/enums/input-color.enum';
import { TextConfigTranslatePipe } from '../../../pipes/text-config-translation.pipe';

@Component({
  selector: 'app-checkbox',
  imports: [
    MatCheckbox,
    ReactiveFormsModule,
    TextConfigTranslatePipe
  ],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent {
  public config = input.required<CheckboxConfig>();

  public getCheckBoxColorClass(color: InputColor): string {
    return 'app-checkbox-input-' + color;
  }
}
