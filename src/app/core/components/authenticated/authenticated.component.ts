import { Component } from '@angular/core';
import { NavigationComponent } from '@common/components/navigation/navigation.component';
import { NavigationConfig } from '@common/components/navigation/models/navigation.config';
import { Icon } from '@common/enums/icon.enum';
import { Route } from '@app/core/enums/route.enum';
import { RouterOutlet } from '@angular/router';
import { Permission } from '@app/core/enums/permission.enum';

@Component({
  selector: 'app-authenticated',
  imports: [NavigationComponent, RouterOutlet],
  templateUrl: './authenticated.component.html',
  styleUrl: './authenticated.component.scss',
})
export class AuthenticatedComponent {
  public readonly navigationConfig = new NavigationConfig({
    logoPath: 'images/Backgroud.png',
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
      {
        text: 'USERS',
        icon: Icon.Group,
        navigateUrl: Route.Users,
        permissions: [Permission.UsersList],
      },
    ],
  });
}
