import { Routes } from '@angular/router';
import { QuizzesComponent } from './pages/quizzes/quizzes.component';
import { Route } from './core/enums/route.enum';
import { QuizPersistComponent } from './pages/quiz-persist/quiz-persist.component';
import { QuizRunCoreComponent } from './pages/quiz-run/quiz-run-core.component';
import { QuizResultComponent } from './pages/quiz-result/quiz-result.component';

export const routes: Routes = [
  { path: '', redirectTo: `/${Route.Quizzes}`, pathMatch: 'full' },
  { path: Route.Quizzes, component: QuizzesComponent },
  { path: Route.QuizCreate, component: QuizPersistComponent },
  { path: `${Route.QuizEdit}:id`, component: QuizPersistComponent },
  { path: `${Route.QuizRun}:id`, component: QuizRunCoreComponent },
  { path: `${Route.QuizResult}:id`, component: QuizResultComponent },
];
