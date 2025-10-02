import { FormArray, FormControl } from '@angular/forms';
import { Optional } from '../../../../../../../common/types/optional.type';
import { QuizPersistSingleChoiceQuestionAnswerFormGroup } from '../form/quiz-persist-single-choice-question-answer.form-group';

export interface IQuizPersistFormSingleChoiceQuestion {
  ordinalNumber: FormControl<number>;
  text: FormControl<string>;
  answers: FormArray<QuizPersistSingleChoiceQuestionAnswerFormGroup>;
  correctAnswerOrdinalNumber: FormControl<Optional<number>>;
}
