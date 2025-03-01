import { Routes } from '@angular/router';
import { QuizzesComponent } from './pages/quizzes/quizzes.component';
import { Route } from './core/enums/route.enum';

export const routes: Routes = [
  { path: '', redirectTo: `/${Route.Quizzes}`, pathMatch: 'full' },
  { path: Route.Quizzes, component: QuizzesComponent },
];
