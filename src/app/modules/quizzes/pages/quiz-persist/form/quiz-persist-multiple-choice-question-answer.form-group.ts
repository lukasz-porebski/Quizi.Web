import { FormGroup } from '@angular/forms';
import { Optional } from '../../../../../../../common/types/optional.type';
import { IQuizPersistFormMultipleChoiceQuestionAnswer } from '../interfaces/quiz-persist-form-multiple-choice-question-answer.interface';

export class QuizPersistMultipleChoiceQuestionAnswerFormGroup extends FormGroup<IQuizPersistFormMultipleChoiceQuestionAnswer> {
  public readonly no: Optional<number>;

  public constructor(controls: IQuizPersistFormMultipleChoiceQuestionAnswer, no: Optional<number>) {
    super(controls);
    this.no = no;
  }
}
