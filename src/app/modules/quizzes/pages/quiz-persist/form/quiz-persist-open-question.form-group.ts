import { QuizPersistQuestionFormGroup } from '@app/modules/quizzes/pages/quiz-persist/form/quiz-persist-question.form-group';
import { QuizPersistFormQuestionType } from '@app/modules/quizzes/pages/quiz-persist/enums/quiz-persist-question-type.enum';
import { Optional } from '@common/types/optional.type';
import { IQuizPersistFormOpenQuestion } from '@app/modules/quizzes/pages/quiz-persist/interfaces/quiz-persist-form-open-question.interface';

export class QuizPersistOpenQuestionFormGroup extends QuizPersistQuestionFormGroup<IQuizPersistFormOpenQuestion> {
  public readonly no: Optional<number>;

  public constructor(controls: IQuizPersistFormOpenQuestion, no: Optional<number>) {
    super(controls, QuizPersistFormQuestionType.Open);
    this.no = no;
  }
}
