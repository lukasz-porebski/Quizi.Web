import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { IQuizPersistFormMultipleChoiceQuestionAnswer } from './quiz-persist-form-multiple-choice-question-answer.interface';

export interface IQuizPersistFormMultipleChoiceQuestion {
  ordinalNumber: FormControl<number>;
  text: FormControl<string>;
  answers: FormArray<FormGroup<IQuizPersistFormMultipleChoiceQuestionAnswer>>;
}
