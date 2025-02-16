import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppErrorComponent } from '../../common/components/error/error.component';
import { AppButtonComponent } from '../../common/components/button/button.component';
import { AppButtonModel } from '../../common/components/button/models/app-button.model';
import { AppButtonColor } from '../../common/components/button/enums/app-button-color.enum';

@Component({
  selector: 'app-root',
  imports: [
    AppErrorComponent,
    AppButtonComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public readonly buttonCfg = new AppButtonModel({
    label: {
      text: 'ERROR'
    },
    color: AppButtonColor.Primary,
    tooltip: {
      text: 'ERROR'
    },
    onClick: () => this._disabled = !this._disabled,
    disabled: () => this._disabled
  })

  private _disabled = false

  public constructor(private readonly _translate: TranslateService) {
    this._translate.addLangs(['pl']);
    this._translate.setDefaultLang('pl');
    this._translate.use('pl');
  }
}
