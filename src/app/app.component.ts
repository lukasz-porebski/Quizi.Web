import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavigationComponent } from '../../common/components/navigation/navigation.component';
import { NavigationConfig } from '../../common/components/navigation/models/navigation.config';
import { Icon } from '../../common/enums/icon.enum';
import { RouterOutlet } from '@angular/router';
import { Route } from './core/enums/route.enum';

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
        text: 'QUIZZES',
        icon: Icon.List,
        navigateUrl: Route.Quizzes,
      },
      {
        text: 'QUIZ_RESULTS',
        icon: Icon.ChecklistRtl,
        navigateUrl: Route.QuizResults,
      },
    ],
  });

  public constructor(private readonly _translate: TranslateService) {
    this._translate.addLangs(['pl']);
    this._translate.setDefaultLang('pl');
    this._translate.use('pl');
  }
}
