import { FormGroup } from '@angular/forms';
import { IQuizRunForm } from '../../interfaces/quiz-run-form.interface';
import { PeriodModel } from '../../../../../../../../../../common/models/period.model';

export interface QuizRunFinishedEvent {
  readonly form: FormGroup<IQuizRunForm>;
  readonly quizRunningPeriod: PeriodModel<Date>;
}
