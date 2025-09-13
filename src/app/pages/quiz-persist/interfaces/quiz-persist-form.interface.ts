import { FormArray, FormControl } from '@angular/forms';
import { Optional } from '../../../../../common/types/optional.type';
import { IQuizPersistFormOpenQuestion } from './quiz-persist-form-open-question.interface';
import { IQuizPersistFormSingleChoiceQuestion } from './quiz-persist-form-single-choice-question.interface';
import { IQuizPersistFormMultipleChoiceQuestion } from './quiz-persist-form-multiple-choice-question.interface';
import { QuizPersistQuestionFormGroup } from '../contexts/quiz-persist-question.form-group';

export interface IQuizPersistForm {
  title: FormControl<string>;
  questionsCountInRunningQuiz: FormControl<Optional<number>>;
  openQuestions: FormArray<QuizPersistQuestionFormGroup<IQuizPersistFormOpenQuestion>>;
  singleChoiceQuestions: FormArray<QuizPersistQuestionFormGroup<IQuizPersistFormSingleChoiceQuestion>>;
  multipleChoiceQuestions: FormArray<QuizPersistQuestionFormGroup<IQuizPersistFormMultipleChoiceQuestion>>;
}
