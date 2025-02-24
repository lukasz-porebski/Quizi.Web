import { Component, input } from '@angular/core';
import { SelectModel } from './models/select.model';
import { MatFormField } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { MultipleSelectAttribute } from '../../attributes/select/multiple-select-attribute';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  imports: [
    MatFormField,
    MatSelect,
    MatOption,
    ReactiveFormsModule,
    TranslatePipe
  ],
  styleUrls: [ './select.component.scss' ]
})
export class AppSelectComponent {
  public configuration = input.required<SelectModel>();

  public get isMultiple(): boolean {
    return this.configuration().attribute instanceof MultipleSelectAttribute;
  }
}
