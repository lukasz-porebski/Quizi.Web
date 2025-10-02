import { FormArray, FormControl, Validators } from '@angular/forms';
import { QuizDetailsClosedQuestionResponse } from '../api/responses/quiz-details-closed-question.response';
import { QuizPersistSingleChoiceQuestionFormGroup } from '../form/quiz-persist-single-choice-question.form-group';
import { QuizDetailsClosedQuestionAnswerResponse } from '../api/responses/quiz-details-closed-question-answer.response';
import { QuizPersistClosedQuestionValidators } from '../validators/quiz-persist-closed-question.validators';
import { QuizPersistSingleChoiceQuestionAnswerFormGroup } from '../form/quiz-persist-single-choice-question-answer.form-group';

export namespace QuizPersistFormSingleChoiceQuestionFactory {
  export function CreateQuestion(
    ordinalNumber: number,
    response?: QuizDetailsClosedQuestionResponse,
  ): QuizPersistSingleChoiceQuestionFormGroup {
    return new QuizPersistSingleChoiceQuestionFormGroup(
      {
        ordinalNumber: new FormControl(ordinalNumber, {
          nonNullable: true,
          validators: [Validators.required],
        }),
        text: new FormControl(response?.text ?? '', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        answers: new FormArray<QuizPersistSingleChoiceQuestionAnswerFormGroup>(
          (response?.answers ?? []).map((a) => CreateAnswer(a.ordinalNumber, a)),
        ),
        correctAnswerOrdinalNumber: new FormControl(
          (response?.answers ?? []).find((a) => a.isCorrect)?.ordinalNumber ?? 0,
          {
            validators: [Validators.required],
          },
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
  ): QuizPersistSingleChoiceQuestionAnswerFormGroup {
    return new QuizPersistSingleChoiceQuestionAnswerFormGroup(
      {
        ordinalNumber: new FormControl(ordinalNumber, {
          nonNullable: true,
          validators: [Validators.required],
        }),
        text: new FormControl(response?.text ?? '', {
          nonNullable: true,
          validators: [Validators.required],
        }),
      },
      response?.no,
    );
  }
}
