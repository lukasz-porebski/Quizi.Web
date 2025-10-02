import { FormControl, Validators } from '@angular/forms';
import { QuizDetailsOpenQuestionResponse } from '@app/modules/quizzes/pages/quiz-persist/api/responses/quiz-details-open-question.response';
import { QuizPersistOpenQuestionFormGroup } from '@app/modules/quizzes/pages/quiz-persist/form/quiz-persist-open-question.form-group';

export namespace QuizPersistFormOpenQuestionFactory {
  export function Create(
    ordinalNumber: number,
    response?: QuizDetailsOpenQuestionResponse,
  ): QuizPersistOpenQuestionFormGroup {
    return new QuizPersistOpenQuestionFormGroup(
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
      response?.no,
    );
  }
}
