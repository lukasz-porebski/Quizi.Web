import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Optional } from '../../../../../common/types/optional.type';
import { IQuizPersistFormOpenQuestion } from './quiz-persist-form-open-question.interface';
import { IQuizPersistFormSingleChoiceQuestion } from './quiz-persist-form-single-choice-question.interface';
import { IQuizPersistFormMultipleChoiceQuestion } from './quiz-persist-form-multiple-choice-question.interface';

export interface IQuizPersistForm {
  title: FormControl<string>;
  questionsCountInRunningQuiz: FormControl<Optional<number>>;
  openQuestions: FormArray<FormGroup<IQuizPersistFormOpenQuestion>>;
  singleChoiceQuestions: FormArray<FormGroup<IQuizPersistFormSingleChoiceQuestion>>;
  multipleChoiceQuestions: FormArray<FormGroup<IQuizPersistFormMultipleChoiceQuestion>>;
}
