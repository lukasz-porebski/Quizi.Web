import { FormArray, FormControl } from '@angular/forms';
import { Optional } from '../../../../../common/types/optional.type';
import { IQuizPersistFormOpenQuestion } from './quiz-persist-form-open-question.interface';
import { QuizPersistQuestionFormGroup } from '../contexts/quiz-persist-question.form-group';
import { QuizPersistSingleChoiceQuestionFormGroup } from '../contexts/quiz-persist-single-choice-question.form-group';
import { QuizPersistMultipleChoiceQuestionFormGroup } from '../contexts/quiz-persist-multiple-choice-question.form-group';

export interface IQuizPersistForm {
  title: FormControl<string>;
  questionsCountInRunningQuiz: FormControl<Optional<number>>;
  openQuestions: FormArray<QuizPersistQuestionFormGroup<IQuizPersistFormOpenQuestion>>;
  singleChoiceQuestions: FormArray<QuizPersistSingleChoiceQuestionFormGroup>;
  multipleChoiceQuestions: FormArray<QuizPersistMultipleChoiceQuestionFormGroup>;
}
