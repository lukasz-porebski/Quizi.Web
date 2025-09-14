import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuizPersistQuestionFormGroup } from '../contexts/quiz-persist-question.form-group';
import { QuizPersistFormQuestionType } from '../enums/quiz-persist-question-type.enum';
import { IQuizPersistFormMultipleChoiceQuestion } from '../interfaces/quiz-persist-form-multiple-choice-question.interface';
import { IQuizPersistFormMultipleChoiceQuestionAnswer } from '../interfaces/quiz-persist-form-multiple-choice-question-answer.interface';
import { QuizDetailsChoiceQuestionResponse } from '../models/quiz-details-choice-question.response';

export namespace QuizPersistFormMultipleChoiceQuestionFactory {
  export function Create(
    ordinalNumber: number,
    response?: QuizDetailsChoiceQuestionResponse,
  ): QuizPersistQuestionFormGroup<IQuizPersistFormMultipleChoiceQuestion> {
    return new QuizPersistQuestionFormGroup<IQuizPersistFormMultipleChoiceQuestion>(
      {
        ordinalNumber: new FormControl(ordinalNumber, {
          nonNullable: true,
          validators: [Validators.required],
        }),
        text: new FormControl(response?.text ?? '', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        answers: new FormArray<FormGroup<IQuizPersistFormMultipleChoiceQuestionAnswer>>(
          (response?.answers ?? []).map(
            (a) =>
              new FormGroup<IQuizPersistFormMultipleChoiceQuestionAnswer>({
                no: new FormControl(a.ordinalNumber, {
                  validators: [Validators.required],
                }),
                text: new FormControl(a.text, {
                  nonNullable: true,
                  validators: [Validators.required],
                }),
                isCorrect: new FormControl(a.isCorrect, {
                  nonNullable: true,
                  validators: [Validators.required],
                }),
              }),
          ),
        ),
      },
      QuizPersistFormQuestionType.MultipleChoice,
    );
  }
}
