import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Optional } from '../../../../../common/types/optional.type';
import { IQuizPersistFormChoiceQuestionAnswer } from './quiz-persist-form-choice-question-answer.interface';

export interface IQuizPersistFormSingleChoiceQuestion {
  text: FormControl<string>;
  answers: FormArray<FormGroup<IQuizPersistFormChoiceQuestionAnswer>>;
  correctAnswerOrdinalNumber: FormControl<Optional<number>>;
}
