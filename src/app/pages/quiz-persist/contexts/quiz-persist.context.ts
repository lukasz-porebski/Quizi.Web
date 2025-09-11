import { QuizDetailsResponse } from '../models/quiz-details.response';
import { IQuizPersistForm } from '../interfaces/quiz -persist-form.interface';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IQuizPersistFormOpenQuestion } from '../interfaces/quiz -persist-form-open-question.interface';

export class QuizPersistContext {
  public form: FormGroup<IQuizPersistForm>;

  public constructor(response?: QuizDetailsResponse) {
    this.form = new FormGroup({
      title: new FormControl(response?.title ?? '', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      questionsCountInRunningQuiz: new FormControl(
        response?.questionsCountInRunningQuiz,
        {
          validators: [Validators.required],
        },
      ),
      openQuestions: new FormArray<FormGroup<IQuizPersistFormOpenQuestion>>(
        (response?.openQuestions ?? []).map(
          (q) =>
            new FormGroup<IQuizPersistFormOpenQuestion>({
              text: new FormControl(q.text, {
                nonNullable: true,
                validators: [Validators.required],
              }),
              answer: new FormControl(q.answer, {
                nonNullable: true,
                validators: [Validators.required],
              }),
            }),
        ),
      ),
    });
  }
}
