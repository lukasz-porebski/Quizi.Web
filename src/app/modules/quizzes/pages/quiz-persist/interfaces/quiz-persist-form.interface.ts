import type { FormArray, FormControl, FormGroup } from '@angular/forms';
import type { Optional } from '@common/types/optional.type';
import type { QuizPersistSingleChoiceQuestionFormGroup } from '@app/modules/quizzes/pages/quiz-persist/form/quiz-persist-single-choice-question.form-group';
import type { QuizPersistMultipleChoiceQuestionFormGroup } from '@app/modules/quizzes/pages/quiz-persist/form/quiz-persist-multiple-choice-question.form-group';
import type { QuizCopyMode } from '@app/modules/quizzes/pages/quizzes/enums/quiz-copy-mode.enum';
import type { ITimeSpanFormControl } from '@common/interfaces/time-span-form-control.interface';
import type { QuizPersistOpenQuestionFormGroup } from '@app/modules/quizzes/pages/quiz-persist/form/quiz-persist-open-question.form-group';

export interface IQuizPersistForm {
  title: FormControl<string>;
  description: FormControl<Optional<string>>;
  duration: FormGroup<ITimeSpanFormControl>;
  questionsCountInRunningQuiz: FormControl<Optional<number>>;
  randomQuestions: FormControl<boolean>;
  randomAnswers: FormControl<boolean>;
  negativePoints: FormControl<boolean>;
  copyMode: FormControl<QuizCopyMode>;
  openQuestions: FormArray<QuizPersistOpenQuestionFormGroup>;
  singleChoiceQuestions: FormArray<QuizPersistSingleChoiceQuestionFormGroup>;
  multipleChoiceQuestions: FormArray<QuizPersistMultipleChoiceQuestionFormGroup>;
}
