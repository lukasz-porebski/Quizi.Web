import { Component, effect, input, viewChild } from '@angular/core';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import type { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import type { ITextConfig } from '@common/models/text.config';
import { TextConfig } from '@common/models/text.config';
import { InputValidation } from '@common/components/inputs/shared/enums/input-validation.enum';
import { TextConfigTranslatePipe } from '@common/pipes/text-config-translation.pipe';
import type { SelectOptionModel } from '@common/components/select/models/select-option.model';

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
  public readonly selectComponent = viewChild.required<MatSelect>('selectComponentMarker');

  public readonly formControl = input.required<FormControl<TValue>>();
  public readonly label = input.required<ITextConfig>();
  public readonly dataSource = input.required<SelectOptionModel<TData>[]>();
  public readonly valueSelector = input<(o: SelectOptionModel<TData>) => TValue>(
    (o) => o.data as unknown as TValue,
  );
  public readonly optionTextSelector = input<(o: SelectOptionModel<TData>) => TextConfig>((o) => o.text);
  public readonly readonly = input<boolean>(false);

  public readonly InputValidation = InputValidation;

  public innerLabel!: TextConfig;

  constructor() {
    effect(() => {
      this.innerLabel = new TextConfig(this.label());
    });
  }
}
