import { QuizPersistQuestionFormGroup } from './quiz-persist-question.form-group';
import { QuizPersistFormQuestionType } from '../enums/quiz-persist-question-type.enum';
import { Optional } from '../../../../../common/types/optional.type';
import { IQuizPersistFormOpenQuestion } from '../interfaces/quiz-persist-form-open-question.interface';

export class QuizPersistOpenQuestionFormGroup extends QuizPersistQuestionFormGroup<IQuizPersistFormOpenQuestion> {
  public readonly no: Optional<number>;

  public constructor(controls: IQuizPersistFormOpenQuestion, no: Optional<number>) {
    super(controls, QuizPersistFormQuestionType.Open);
    this.no = no;
  }
}
