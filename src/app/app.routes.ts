import { Routes } from '@angular/router';
import { QuizzesComponent } from './modules/quizzes/pages/quizzes/quizzes.component';
import { Route } from './core/enums/route.enum';
import { QuizPersistComponent } from './modules/quizzes/pages/quiz-persist/quiz-persist.component';
import { QuizRunCoreComponent } from './modules/quizzes/pages/quiz-run/quiz-run-core.component';
import { QuizResultComponent } from './modules/quiz-results/pages/quiz-result/quiz-result.component';
import { QuizResultsComponent } from './modules/quiz-results/pages/quiz-results/quiz-results.component';

export const routes: Routes = [
  { path: '', redirectTo: `/${Route.Quizzes}`, pathMatch: 'full' },
  { path: Route.Quizzes, component: QuizzesComponent },
  { path: Route.QuizCreate, component: QuizPersistComponent },
  { path: `${Route.QuizEdit}:id`, component: QuizPersistComponent },
  { path: `${Route.QuizPreview}:id`, component: QuizPersistComponent },
  { path: `${Route.QuizRun}:id`, component: QuizRunCoreComponent },
  { path: Route.QuizResults, component: QuizResultsComponent },
  { path: `${Route.QuizResult}:id`, component: QuizResultComponent },
];
