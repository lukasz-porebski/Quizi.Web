import { Component, effect, input, viewChild } from '@angular/core';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { ITextConfig, TextConfig } from '@common/models/text.config';
import { InputValidation } from '@common/components/inputs/shared/enums/input-validation.enum';
import { TextConfigTranslatePipe } from '@common/pipes/text-config-translation.pipe';
import { SelectOptionModel } from '@common/components/select/models/select-option.model';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  imports: [
    MatFormField,
    MatSelect,
    MatOption,
    ReactiveFormsModule,
    TranslatePipe,
    MatLabel,
    MatError,
    TextConfigTranslatePipe,
  ],
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent<TData, TValue = TData> {
  public selectComponent = viewChild.required<MatSelect>('selectComponentMarker');

  public formControl = input.required<FormControl<TValue>>();
  public label = input.required<ITextConfig>();
  public dataSource = input.required<SelectOptionModel<TData>[]>();
  public valueSelector = input<(o: SelectOptionModel<TData>) => TValue>((o) => o.data as unknown as TValue);
  public optionTextSelector = input<(o: SelectOptionModel<TData>) => TextConfig>((o) => o.text);
  public readonly = input<boolean>(false);

  public readonly InputValidation = InputValidation;

  public innerLabel!: TextConfig;

  public constructor() {
    effect(() => {
      this.innerLabel = new TextConfig(this.label());
    });
  }
}
