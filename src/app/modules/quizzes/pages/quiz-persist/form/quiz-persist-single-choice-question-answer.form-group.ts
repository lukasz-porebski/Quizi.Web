import { FormGroup } from '@angular/forms';
import type { IQuizPersistFormSingleChoiceQuestionAnswer } from '@app/modules/quizzes/pages/quiz-persist/interfaces/quiz-persist-form-single-choice-question-answer.interface';
import type { Optional } from '@common/types/optional.type';

export class QuizPersistSingleChoiceQuestionAnswerFormGroup extends FormGroup<IQuizPersistFormSingleChoiceQuestionAnswer> {
  public readonly no: Optional<number>;

  constructor(controls: IQuizPersistFormSingleChoiceQuestionAnswer, no: Optional<number>) {
    super(controls);
    this.no = no;
  }
}
