import { Component, contentChild, effect, input } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputColor } from '@common/components/inputs/shared/enums/input-color.enum';
import { TextConfigTranslatePipe } from '@common/pipes/text-config-translation.pipe';
import { ITextConfig, TextConfig } from '@common/models/text.config';
import { CheckboxLabelPosition } from '@common/components/inputs/checkbox/enums/label-position.enum';
import { isDefined } from '@common/utils/utils';

@Component({
  selector: 'app-checkbox',
  imports: [MatCheckbox, ReactiveFormsModule, TextConfigTranslatePipe],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
})
export class CheckboxComponent {
  public childComponent = contentChild('customLabel');

  public formControl = input<FormControl<boolean>>();
  public value = input<boolean>();
  public label = input<ITextConfig>();
  public readonly = input<boolean>(false);
  public labelPosition = input<CheckboxLabelPosition>(CheckboxLabelPosition.After);
  public color = input<InputColor>(InputColor.Default);
  public disableLabelClick = input<boolean>(false);

  public getCheckBoxColorClass(color: InputColor): string {
    return 'checkbox-' + color;
  }

  public innerFormControl!: FormControl<boolean>;
  public innerLabel?: TextConfig;

  public constructor() {
    effect(() => {
      this.innerLabel = isDefined(this.label()) ? new TextConfig(this.label()!) : undefined;
    });

    effect(() => {
      if (isDefined(this.formControl())) {
        this.innerFormControl = this.formControl()!;
      } else {
        this.innerFormControl = isDefined(this.value())
          ? new FormControl({
              value: this.value()!,
              disabled: false,
            })
          : new FormControl();
      }
    });
  }
}
