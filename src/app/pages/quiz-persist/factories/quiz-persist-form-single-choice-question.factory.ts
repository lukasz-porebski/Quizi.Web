import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuizPersistQuestionFormGroup } from '../contexts/quiz-persist-question.form-group';
import { QuizPersistFormQuestionType } from '../enums/quiz-persist-question-type.enum';
import { IQuizPersistFormSingleChoiceQuestion } from '../interfaces/quiz-persist-form-single-choice-question.interface';
import { IQuizPersistFormSingleChoiceQuestionAnswer } from '../interfaces/quiz-persist-form-single-choice-question-answer.interface';
import { QuizDetailsChoiceQuestionResponse } from '../models/quiz-details-choice-question.response';

export namespace QuizPersistFormSingleChoiceQuestionFactory {
  export function Create(
    ordinalNumber: number,
    response?: QuizDetailsChoiceQuestionResponse,
  ): QuizPersistQuestionFormGroup<IQuizPersistFormSingleChoiceQuestion> {
    return new QuizPersistQuestionFormGroup<IQuizPersistFormSingleChoiceQuestion>(
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
          (response?.answers ?? []).map(
            (a) =>
              new FormGroup<IQuizPersistFormSingleChoiceQuestionAnswer>({
                no: new FormControl(a.ordinalNumber, {
                  validators: [Validators.required],
                }),
                text: new FormControl(a.text, {
                  nonNullable: true,
                  validators: [Validators.required],
                }),
              }),
          ),
        ),
        correctAnswerOrdinalNumber: new FormControl(
          (response?.answers ?? []).find((a) => a.isCorrect)?.ordinalNumber ?? 0,
          {
            validators: [Validators.required],
          },
        ),
      },
      QuizPersistFormQuestionType.SingleChoice,
    );
  }
}
