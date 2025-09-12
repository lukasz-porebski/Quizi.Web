import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { IQuizPersistFormMultipleChoiceQuestionAnswer } from './quiz-persist-form-multiple-choice-question-answer.interface';

export interface IQuizPersistFormMultipleChoiceQuestion {
  text: FormControl<string>;
  answers: FormArray<FormGroup<IQuizPersistFormMultipleChoiceQuestionAnswer>>;
}
