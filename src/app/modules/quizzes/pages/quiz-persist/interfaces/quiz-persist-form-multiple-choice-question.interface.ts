import type { FormArray, FormControl } from '@angular/forms';
import type { QuizPersistMultipleChoiceQuestionAnswerFormGroup } from '@app/modules/quizzes/pages/quiz-persist/form/quiz-persist-multiple-choice-question-answer.form-group';

export interface IQuizPersistFormMultipleChoiceQuestion {
  ordinalNumber: FormControl<number>;
  text: FormControl<string>;
  answers: FormArray<QuizPersistMultipleChoiceQuestionAnswerFormGroup>;
}
