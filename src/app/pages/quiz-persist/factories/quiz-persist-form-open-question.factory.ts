import { FormControl, Validators } from '@angular/forms';
import { QuizPersistQuestionFormGroup } from '../form/quiz-persist-question.form-group';
import { IQuizPersistFormOpenQuestion } from '../interfaces/quiz-persist-form-open-question.interface';
import { QuizPersistFormQuestionType } from '../enums/quiz-persist-question-type.enum';
import { QuizDetailsOpenQuestionResponse } from '../models/quiz-details-open-question.response';

export namespace QuizPersistFormOpenQuestionFactory {
  export function Create(
    ordinalNumber: number,
    response?: QuizDetailsOpenQuestionResponse,
  ): QuizPersistQuestionFormGroup<IQuizPersistFormOpenQuestion> {
    return new QuizPersistQuestionFormGroup<IQuizPersistFormOpenQuestion>(
      {
        ordinalNumber: new FormControl(ordinalNumber, {
          nonNullable: true,
          validators: [Validators.required],
        }),
        text: new FormControl(response?.text ?? '', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        answer: new FormControl(response?.answer ?? '', {
          nonNullable: true,
          validators: [Validators.required],
        }),
      },
      QuizPersistFormQuestionType.Open,
    );
  }
}
