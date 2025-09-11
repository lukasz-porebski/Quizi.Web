import { Component, input } from '@angular/core';
import { SelectConfig } from './models/select.config';
import { MatFormField } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { MultipleSelectAttribute } from '../../attributes/select/multiple-select-attribute';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  imports: [MatFormField, MatSelect, MatOption, ReactiveFormsModule, TranslatePipe],
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
  public config = input.required<SelectConfig>();

  public get isMultiple(): boolean {
    return this.config().attribute instanceof MultipleSelectAttribute;
  }
}
