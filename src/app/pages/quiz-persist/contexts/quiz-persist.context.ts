import { QuizDetailsResponse } from '../models/quiz-details.response';
import { IQuizPersistForm } from '../interfaces/quiz -persist-form.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export class QuizPersistContext {
  public form: FormGroup<IQuizPersistForm>;

  public constructor(response?: QuizDetailsResponse) {
    this.form = new FormGroup({
      title: new FormControl(response?.title, { validators: [Validators.required] }),
      questionsCountInRunningQuiz: new FormControl(
        response?.questionsCountInRunningQuiz,
        {
          validators: [Validators.required],
        },
      ),
    });
  }
}
