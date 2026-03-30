import type { FormGroup } from '@angular/forms';
import type { IQuizRunForm } from '@app/modules/quizzes/pages/quiz-run/pages/run/interfaces/quiz-run-form.interface';
import type { PeriodModel } from 'lp-common';

export interface QuizRunFinishedEvent {
  readonly form: FormGroup<IQuizRunForm>;
  readonly quizRunningPeriod: PeriodModel<Date>;
}
