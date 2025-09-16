import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IQuizPersistFormSingleChoiceQuestionAnswer } from '../interfaces/quiz-persist-form-single-choice-question-answer.interface';
import { QuizDetailsChoiceQuestionResponse } from '../models/quiz-details-choice-question.response';
import { QuizPersistSingleChoiceQuestionFormGroup } from '../form/quiz-persist-single-choice-question.form-group';
import { QuizDetailsChoiceQuestionAnswerResponse } from '../models/quiz-details-choice-question-answer.response';
import { QuizPersistChoiceQuestionValidators } from '../validators/quiz-persist-choice-question.validators';

export namespace QuizPersistFormSingleChoiceQuestionFactory {
  export function CreateQuestion(
    ordinalNumber: number,
    response?: QuizDetailsChoiceQuestionResponse,
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
        answers: new FormArray<FormGroup<IQuizPersistFormSingleChoiceQuestionAnswer>>(
          (response?.answers ?? []).map((a) => CreateAnswer(a.ordinalNumber, a)),
        ),
        correctAnswerOrdinalNumber: new FormControl(
          (response?.answers ?? []).find((a) => a.isCorrect)?.ordinalNumber ?? 0,
          {
            validators: [Validators.required],
          },
        ),
      },
      [
        QuizPersistChoiceQuestionValidators.MinAnswersCount(),
        QuizPersistChoiceQuestionValidators.AnswersAreUnique(),
      ],
    );
  }

  export function CreateAnswer(
    ordinalNumber: number,
    response?: QuizDetailsChoiceQuestionAnswerResponse,
  ): FormGroup<IQuizPersistFormSingleChoiceQuestionAnswer> {
    return new FormGroup<IQuizPersistFormSingleChoiceQuestionAnswer>({
      no: new FormControl(response?.no),
      ordinalNumber: new FormControl(ordinalNumber, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      text: new FormControl(response?.text ?? '', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }
}
