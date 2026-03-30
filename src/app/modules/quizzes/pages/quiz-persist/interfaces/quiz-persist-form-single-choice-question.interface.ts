import type { FormArray, FormControl } from '@angular/forms';
import type { QuizPersistSingleChoiceQuestionAnswerFormGroup } from '@app/modules/quizzes/pages/quiz-persist/form/quiz-persist-single-choice-question-answer.form-group';
import type { Optional } from 'lp-common';

export interface IQuizPersistFormSingleChoiceQuestion {
  ordinalNumber: FormControl<number>;
  text: FormControl<string>;
  answers: FormArray<QuizPersistSingleChoiceQuestionAnswerFormGroup>;
  correctAnswerOrdinalNumber: FormControl<Optional<number>>;
}
