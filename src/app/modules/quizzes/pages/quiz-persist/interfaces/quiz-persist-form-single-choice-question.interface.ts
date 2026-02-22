import type { FormArray, FormControl } from '@angular/forms';
import type { Optional } from '@common/types/optional.type';
import type { QuizPersistSingleChoiceQuestionAnswerFormGroup } from '@app/modules/quizzes/pages/quiz-persist/form/quiz-persist-single-choice-question-answer.form-group';

export interface IQuizPersistFormSingleChoiceQuestion {
  ordinalNumber: FormControl<number>;
  text: FormControl<string>;
  answers: FormArray<QuizPersistSingleChoiceQuestionAnswerFormGroup>;
  correctAnswerOrdinalNumber: FormControl<Optional<number>>;
}
