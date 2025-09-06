import { TextAttribute } from '../../../../../common/attributes/text-attribute';
import { QuizDetailsResponse } from '../models/quiz-details.response';

export class QuizPersistContext {
  public title: TextAttribute;

  public constructor(response?: QuizDetailsResponse) {
    this.title = new TextAttribute({
      label: { text: 'title' },
      defaultValue: response?.title,
    });
  }
}
