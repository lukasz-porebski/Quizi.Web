import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Optional } from '../../../../../common/types/optional.type';
import { IQuizPersistFormOpenQuestion } from './quiz-persist-form-open-question.interface';
import { QuizPersistQuestionFormGroup } from '../form/quiz-persist-question.form-group';
import { QuizPersistSingleChoiceQuestionFormGroup } from '../form/quiz-persist-single-choice-question.form-group';
import { QuizPersistMultipleChoiceQuestionFormGroup } from '../form/quiz-persist-multiple-choice-question.form-group';
import { QuizCopyMode } from '../../quizzes/enums/quiz-copy-mode.enum';
import { ITimeSpanFormControl } from '../../../../../common/interfaces/time-span-form-control.interface';

export interface IQuizPersistForm {
  title: FormControl<string>;
  duration: FormGroup<ITimeSpanFormControl>;
  questionsCountInRunningQuiz: FormControl<Optional<number>>;
  randomQuestions: FormControl<boolean>;
  randomAnswers: FormControl<boolean>;
  negativePoints: FormControl<boolean>;
  copyMode: FormControl<QuizCopyMode>;
  openQuestions: FormArray<QuizPersistQuestionFormGroup<IQuizPersistFormOpenQuestion>>;
  singleChoiceQuestions: FormArray<QuizPersistSingleChoiceQuestionFormGroup>;
  multipleChoiceQuestions: FormArray<QuizPersistMultipleChoiceQuestionFormGroup>;
}
