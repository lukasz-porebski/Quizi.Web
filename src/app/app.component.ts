import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavigationComponent } from '../../common/components/navigation/navigation.component';
import { NavigationConfig } from '../../common/components/navigation/models/navigation.config';
import { Icon } from '../../common/enums/icon.enum';
import { RouterOutlet } from '@angular/router';

export interface IMyRow {
  text: string;
  liczba: number;
}

@Component({
  selector: 'app-root',
  imports: [NavigationComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public readonly navigationConfig = new NavigationConfig({
    logoPath: '',
    menu: [
      {
        text: 'ERROR',
        icon: Icon.List,
        nextLevels: [
          {
            text: 'FIELD_IS_REQUIRED',
            nextLevels: [
              {
                text: 'FILTER',
              },
            ],
          },
        ],
      },
    ],
  });

  public constructor(private readonly _translate: TranslateService) {
    this._translate.addLangs(['pl']);
    this._translate.setDefaultLang('pl');
    this._translate.use('pl');
  }
}
