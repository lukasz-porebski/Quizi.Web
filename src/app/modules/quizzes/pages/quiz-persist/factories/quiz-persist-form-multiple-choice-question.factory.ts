import { FormArray, FormControl, Validators } from '@angular/forms';
import { QuizDetailsClosedQuestionResponse } from '@app/modules/quizzes/pages/quiz-persist/api/responses/quiz-details-closed-question.response';
import { QuizDetailsClosedQuestionAnswerResponse } from '@app/modules/quizzes/pages/quiz-persist/api/responses/quiz-details-closed-question-answer.response';
import { QuizPersistMultipleChoiceQuestionFormGroup } from '@app/modules/quizzes/pages/quiz-persist/form/quiz-persist-multiple-choice-question.form-group';
import { QuizPersistClosedQuestionValidators } from '@app/modules/quizzes/pages/quiz-persist/validators/quiz-persist-closed-question.validators';
import { QuizPersistMultipleChoiceQuestionAnswerFormGroup } from '@app/modules/quizzes/pages/quiz-persist/form/quiz-persist-multiple-choice-question-answer.form-group';

export namespace QuizPersistFormMultipleChoiceQuestionFactory {
  export function CreateQuestion(
    ordinalNumber: number,
    response?: QuizDetailsClosedQuestionResponse,
  ): QuizPersistMultipleChoiceQuestionFormGroup {
    return new QuizPersistMultipleChoiceQuestionFormGroup(
      {
        ordinalNumber: new FormControl(ordinalNumber, {
          nonNullable: true,
          validators: [Validators.required],
        }),
        text: new FormControl(response?.text ?? '', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        answers: new FormArray<QuizPersistMultipleChoiceQuestionAnswerFormGroup>(
          (response?.answers ?? []).map((a) => CreateAnswer(a.ordinalNumber, a)),
        ),
      },
      response?.no,
      [
        QuizPersistClosedQuestionValidators.MinAnswersCount(),
        QuizPersistClosedQuestionValidators.AnswersAreUnique(),
      ],
    );
  }

  export function CreateAnswer(
    ordinalNumber: number,
    response?: QuizDetailsClosedQuestionAnswerResponse,
  ): QuizPersistMultipleChoiceQuestionAnswerFormGroup {
    return new QuizPersistMultipleChoiceQuestionAnswerFormGroup(
      {
        ordinalNumber: new FormControl(ordinalNumber, {
          nonNullable: true,
          validators: [Validators.required],
        }),
        text: new FormControl(response?.text ?? '', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        isCorrect: new FormControl(response?.isCorrect ?? false, {
          nonNullable: true,
          validators: [Validators.required],
        }),
      },
      response?.no,
    );
  }
}
