import { FormGroup } from '@angular/forms';
import { IQuizPersistFormSingleChoiceQuestionAnswer } from '../interfaces/quiz-persist-form-single-choice-question-answer.interface';
import { Optional } from '../../../../../../../common/types/optional.type';

export class QuizPersistSingleChoiceQuestionAnswerFormGroup extends FormGroup<IQuizPersistFormSingleChoiceQuestionAnswer> {
  public readonly no: Optional<number>;

  public constructor(controls: IQuizPersistFormSingleChoiceQuestionAnswer, no: Optional<number>) {
    super(controls);
    this.no = no;
  }
}
