import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Optional } from '../../../../../common/types/optional.type';
import { IQuizPersistFormOpenQuestion } from './quiz -persist-form-open-question.interface';

export interface IQuizPersistForm {
  title: FormControl<string>;
  questionsCountInRunningQuiz: FormControl<Optional<number>>;
  openQuestions: FormArray<FormGroup<IQuizPersistFormOpenQuestion>>;
}
