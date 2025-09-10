import { TextAttribute } from '../../../../../common/attributes/text-attribute';
import { QuizDetailsResponse } from '../models/quiz-details.response';
import { NumberAttribute } from '../../../../../common/attributes/number-attribute';

export class QuizPersistContext {
  public title: TextAttribute;
  public questionsCountInRunningQuiz: NumberAttribute;

  public constructor(response?: QuizDetailsResponse) {
    this.title = new TextAttribute({
      label: { text: 'TITLE' },
      defaultValue: response?.title,
    });
    this.questionsCountInRunningQuiz = new NumberAttribute({
      label: { text: 'QUESTIONS_COUNT_IN_RUNNING_QUIZ' },
      defaultValue: response?.questionsCountInRunningQuiz,
    });
  }
}
