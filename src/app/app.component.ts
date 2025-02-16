import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppErrorComponent } from '../../common/components/error/error.component';

@Component({
  selector: 'app-root',
  imports: [
    AppErrorComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Quizi';

  public constructor(private readonly _translate: TranslateService) {
    this._translate.addLangs(['pl']);
    this._translate.setDefaultLang('pl');
    this._translate.use('pl');
  }
}
