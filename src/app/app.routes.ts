import { Routes } from '@angular/router';
import { QuizzesComponent } from './pages/quizzes/quizzes.component';
import { Route } from './core/enums/route.enum';
import { QuizPersistComponent } from './pages/quiz-persist/quiz-persist.component';

export const routes: Routes = [
  { path: '', redirectTo: `/${Route.Quizzes}`, pathMatch: 'full' },
  { path: Route.Quizzes, component: QuizzesComponent },
  { path: `${Route.QuizEdit}:id`, component: QuizPersistComponent },
];
