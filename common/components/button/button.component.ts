import { Component, inject, input } from '@angular/core';
import { ButtonModel } from './models/button.model';
import { ButtonColor } from './enums/button-color.enum';
import { MatTooltip } from '@angular/material/tooltip';
import { MatButton } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
import { MatStepperNext } from '@angular/material/stepper';
import { TextModel } from '../../models/text.model';
import { isDefined } from '../../utils/utils';
import { Optional } from '../../types/optional.type';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  imports: [
    MatTooltip,
    MatButton,
    MatStepperNext
  ],
  providers: [ TranslatePipe ],
  styleUrls: [ './button.component.scss' ]
})
export class AppButtonComponent {
  public configuration = input.required<ButtonModel>();

  public get matColor(): string {
    return this.configuration().color === ButtonColor.Accent ||
    this.configuration().color === ButtonColor.Primary
      ? this.configuration().color
      : '';
  }

  private readonly _translatePipe = inject(TranslatePipe)

  public getText(model?: TextModel): Optional<string> {
    if (!isDefined(model))
      return null;

    return model.translate ? this._translatePipe.transform(model.text) : model.text;
  }
}
