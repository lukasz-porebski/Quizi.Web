import { Routes } from '@angular/router';
import { QuizzesComponent } from '@app/modules/quizzes/pages/quizzes/quizzes.component';
import { Route } from '@app/core/enums/route.enum';
import { QuizPersistComponent } from '@app/modules/quizzes/pages/quiz-persist/quiz-persist.component';
import { QuizRunCoreComponent } from '@app/modules/quizzes/pages/quiz-run/quiz-run-core.component';
import { QuizResultComponent } from '@app/modules/quiz-results/pages/quiz-result/quiz-result.component';
import { QuizResultsComponent } from '@app/modules/quiz-results/pages/quiz-results/quiz-results.component';
import { LoginComponent } from '@app/modules/identity/pages/login/login.component';
import { authenticatedGuard } from '@common/identity/guards/authenticated.guard';
import { unauthenticatedGuard } from '@common/identity/guards/unauthenticated.guard';
import { AuthenticatedComponent } from '@app/core/components/authenticated/authenticated.component';

export const routes: Routes = [
  {
    path: '',
    canActivateChild: [authenticatedGuard],
    component: AuthenticatedComponent,
    children: [
      { path: Route.Quizzes, component: QuizzesComponent },
      { path: Route.QuizCreate, component: QuizPersistComponent },
      { path: `${Route.QuizEdit}:id`, component: QuizPersistComponent },
      { path: `${Route.QuizPreview}:id`, component: QuizPersistComponent },
      { path: `${Route.QuizRun}:id`, component: QuizRunCoreComponent },
      { path: Route.QuizResults, component: QuizResultsComponent },
      { path: `${Route.QuizResult}:id`, component: QuizResultComponent },
    ],
  },
  { path: Route.Login, component: LoginComponent, canActivateChild: [unauthenticatedGuard] },
];
