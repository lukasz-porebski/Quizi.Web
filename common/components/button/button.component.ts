import { Component, inject, input } from '@angular/core';
import { AppButtonModel } from './models/app-button.model';
import { AppButtonColor } from './enums/app-button-color.enum';
import { MatTooltip } from '@angular/material/tooltip';
import { MatButton } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
import { MatStepperNext } from '@angular/material/stepper';
import { AppTextModel } from '../../models/app-text.model';
import { isDefined } from '../../utils/utils';
import { Optional } from '../types/optional.type';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  imports: [
    MatTooltip,
    MatButton,
    MatStepperNext
  ],
  providers: [TranslatePipe],
  styleUrls: ['./button.component.scss']
})
export class AppButtonComponent {
  public configuration = input.required<AppButtonModel>();

  public get matColor(): string {
    return this.configuration().color === AppButtonColor.Accent ||
    this.configuration().color === AppButtonColor.Primary
      ? this.configuration().color
      : '';
  }

  private readonly _translatePipe = inject(TranslatePipe)

  public getText(model?: AppTextModel): Optional<string> {
    if (!isDefined(model))
      return null;

    return model.translate ? this._translatePipe.transform(model.text) : model.text;
  }
}
