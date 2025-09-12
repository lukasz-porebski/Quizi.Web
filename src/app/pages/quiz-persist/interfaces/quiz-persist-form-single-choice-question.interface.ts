import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Optional } from '../../../../../common/types/optional.type';
import { IQuizPersistFormSingleChoiceQuestionAnswer } from './quiz-persist-form-single-choice-question-answer.interface';

export interface IQuizPersistFormSingleChoiceQuestion {
  text: FormControl<string>;
  answers: FormArray<FormGroup<IQuizPersistFormSingleChoiceQuestionAnswer>>;
  correctAnswerOrdinalNumber: FormControl<Optional<number>>;
}
