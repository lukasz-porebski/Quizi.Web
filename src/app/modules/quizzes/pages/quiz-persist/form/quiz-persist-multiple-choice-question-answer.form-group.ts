import { FormGroup } from '@angular/forms';
import { Optional } from '@common/types/optional.type';
import { IQuizPersistFormMultipleChoiceQuestionAnswer } from '@app/modules/quizzes/pages/quiz-persist/interfaces/quiz-persist-form-multiple-choice-question-answer.interface';

export class QuizPersistMultipleChoiceQuestionAnswerFormGroup extends FormGroup<IQuizPersistFormMultipleChoiceQuestionAnswer> {
  public readonly no: Optional<number>;

  constructor(controls: IQuizPersistFormMultipleChoiceQuestionAnswer, no: Optional<number>) {
    super(controls);
    this.no = no;
  }
}
