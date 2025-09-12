import { Component, contentChild, effect, input } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputColor } from '../shared/enums/input-color.enum';
import { TextConfigTranslatePipe } from '../../../pipes/text-config-translation.pipe';
import { ITextConfig, TextConfig } from '../../../models/text.config';
import { CheckboxLabelPosition } from './enums/label-position.enum';
import { isDefined } from '../../../utils/utils';

@Component({
  selector: 'app-checkbox',
  imports: [MatCheckbox, ReactiveFormsModule, TextConfigTranslatePipe],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
})
export class CheckboxComponent {
  public childComponent = contentChild('customLabel');

  public formControl = input.required<FormControl<boolean>>();
  public label = input<ITextConfig>();
  public readonly = input<boolean>(false);
  public labelPosition = input<CheckboxLabelPosition>(CheckboxLabelPosition.After);
  public color = input<InputColor>(InputColor.Default);
  public disableLabelClick = input<boolean>(false);

  public getCheckBoxColorClass(color: InputColor): string {
    return 'app-checkbox-input-' + color;
  }

  public innerLabel?: TextConfig;

  public constructor() {
    effect(() => {
      this.innerLabel = isDefined(this.label()) ? new TextConfig(this.label()!) : undefined;
    });
  }
}
