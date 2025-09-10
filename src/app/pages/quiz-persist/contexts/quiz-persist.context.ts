import { QuizDetailsResponse } from '../models/quiz-details.response';
import { NumberAttribute } from '../../../../../common/attributes/number-attribute';
import { IQuizPersistForm } from '../interfaces/quiz -persist-form.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export class QuizPersistContext {
  public form: FormGroup<IQuizPersistForm>;
  // public questionsCountInRunningQuiz: NumberAttribute;

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

    this.questionsCountInRunningQuiz = new NumberAttribute({
      label: { text: 'QUESTIONS_COUNT_IN_RUNNING_QUIZ' },
      defaultValue: response?.questionsCountInRunningQuiz,
    });
  }
}
