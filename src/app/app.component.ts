import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ErrorComponent } from '../../common/components/error/error.component';
import { ButtonComponent } from '../../common/components/button/button.component';
import { ButtonConfig } from '../../common/components/button/models/button.config';
import { ButtonColor } from '../../common/components/button/enums/color.enum';

@Component({
  selector: 'app-root',
  imports: [
    ErrorComponent,
    ButtonComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public readonly buttonCfg = new ButtonConfig({
    text: {
      text: 'ERROR'
    },
    color: ButtonColor.Primary,
    tooltip: {
      text: 'ERROR'
    },
    onClick: () => this._disabled = !this._disabled,
    disabled: () => this._disabled
  })

  private _disabled = false

  public constructor(private readonly _translate: TranslateService) {
    this._translate.addLangs([ 'pl' ]);
    this._translate.setDefaultLang('pl');
    this._translate.use('pl');
  }
}
