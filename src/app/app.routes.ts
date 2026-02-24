import type { Routes } from '@angular/router';
import { Route } from '@app/core/enums/route.enum';
import { AuthenticatedComponent } from '@app/core/components/authenticated/authenticated.component';
import { authenticatedGuard } from '@common/identity/guards/authenticated.guard';
import { unauthenticatedGuard } from '@common/identity/guards/unauthenticated.guard';
import { permissionGuard } from '@common/identity/guards/permission.guard';
import { Permission } from '@app/core/enums/permission.enum';

export const routes: Routes = [
  {
    path: '',
    canActivateChild: [authenticatedGuard],
    component: AuthenticatedComponent,
    children: [
      {
        path: Route.Quizzes,
        loadComponent: () =>
          import('@app/modules/quizzes/pages/quizzes/quizzes.component').then((m) => m.QuizzesComponent),
      },
      {
        path: Route.QuizCreate,
        loadComponent: () =>
          import('@app/modules/quizzes/pages/quiz-persist/quiz-persist.component').then(
            (m) => m.QuizPersistComponent,
          ),
      },
      {
        path: `${Route.QuizEdit}:id`,
        loadComponent: () =>
          import('@app/modules/quizzes/pages/quiz-persist/quiz-persist.component').then(
            (m) => m.QuizPersistComponent,
          ),
      },
      {
        path: `${Route.QuizPreview}:id`,
        loadComponent: () =>
          import('@app/modules/quizzes/pages/quiz-persist/quiz-persist.component').then(
            (m) => m.QuizPersistComponent,
          ),
      },
      {
        path: `${Route.QuizRun}:id`,
        loadComponent: () =>
          import('@app/modules/quizzes/pages/quiz-run/quiz-run-core.component').then(
            (m) => m.QuizRunCoreComponent,
          ),
      },
      {
        path: Route.QuizResults,
        loadComponent: () =>
          import('@app/modules/quiz-results/pages/quiz-results/quiz-results.component').then(
            (m) => m.QuizResultsComponent,
          ),
      },
      {
        path: `${Route.QuizResult}:id`,
        loadComponent: () =>
          import('@app/modules/quiz-results/pages/quiz-result/quiz-result.component').then(
            (m) => m.QuizResultComponent,
          ),
      },
      {
        path: Route.Users,
        loadComponent: () =>
          import('@app/modules/users/pages/users/users.component').then((m) => m.UsersComponent),
        canActivate: [permissionGuard(Permission.UsersList)],
      },
    ],
  },
  {
    path: Route.Login,
    loadComponent: () =>
      import('@app/modules/identity/pages/login/login.component').then((m) => m.LoginComponent),
    canActivateChild: [unauthenticatedGuard],
  },
  {
    path: Route.Registration,
    loadComponent: () =>
      import('@app/modules/identity/pages/registration/registration.component').then(
        (m) => m.RegistrationComponent,
      ),
    canActivateChild: [unauthenticatedGuard],
  },
];
