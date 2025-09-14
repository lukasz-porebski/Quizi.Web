import { QuizDetailsResponse } from '../models/quiz-details.response';
import { QuizPersistFormFactory } from '../factories/quiz-persist-form.factory';
import { QuizPersistFormGroup } from './quiz-persist.form-group';

export class QuizPersistContext {
  public form: QuizPersistFormGroup;

  public constructor(response?: QuizDetailsResponse) {
    this.form = QuizPersistFormFactory.Create(response);
  }
}
