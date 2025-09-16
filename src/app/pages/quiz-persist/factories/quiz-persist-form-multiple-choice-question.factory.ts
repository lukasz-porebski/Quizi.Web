import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IQuizPersistFormMultipleChoiceQuestionAnswer } from '../interfaces/quiz-persist-form-multiple-choice-question-answer.interface';
import { QuizDetailsChoiceQuestionResponse } from '../models/quiz-details-choice-question.response';
import { QuizDetailsChoiceQuestionAnswerResponse } from '../models/quiz-details-choice-question-answer.response';
import { QuizPersistMultipleChoiceQuestionFormGroup } from '../form/quiz-persist-multiple-choice-question.form-group';
import { QuizPersistChoiceQuestionValidators } from '../validators/quiz-persist-choice-question.validators';

export namespace QuizPersistFormMultipleChoiceQuestionFactory {
  export function CreateQuestion(
    ordinalNumber: number,
    response?: QuizDetailsChoiceQuestionResponse,
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
        answers: new FormArray<FormGroup<IQuizPersistFormMultipleChoiceQuestionAnswer>>(
          (response?.answers ?? []).map((a) => CreateAnswer(a.ordinalNumber, a)),
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
  ): FormGroup<IQuizPersistFormMultipleChoiceQuestionAnswer> {
    return new FormGroup<IQuizPersistFormMultipleChoiceQuestionAnswer>({
      no: new FormControl(response?.no),
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
    });
  }
}
