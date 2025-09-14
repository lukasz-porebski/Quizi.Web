import { QuizDetailsResponse } from '../models/quiz-details.response';
import { QuizPersistFormFactory } from '../factories/quiz-persist-form.factory';
import { QuizPersistFormOpenQuestionFactory } from '../factories/quiz-persist-form-open-question.factory';
import { isEmpty } from '../../../../../common/utils/utils';
import { QuizPersistFormSingleChoiceQuestionFactory } from '../factories/quiz-persist-form-single-choice-question.factory';
import { QuizPersistFormMultipleChoiceQuestionFactory } from '../factories/quiz-persist-form-multiple-choice-question.factory';
import { QuizPersistFormGroup } from './quiz-persist.form-group';

export class QuizPersistContext {
  public form: QuizPersistFormGroup;

  public constructor(response?: QuizDetailsResponse) {
    this.form = QuizPersistFormFactory.Create(response);
  }

  public addOpenQuestion(): void {
    this.form.controls.openQuestions.controls.push(
      QuizPersistFormOpenQuestionFactory.Create(this._getNextOrdinalNumber()),
    );
  }

  public addSingleChoiceQuestion(): void {
    this.form.controls.singleChoiceQuestions.controls.push(
      QuizPersistFormSingleChoiceQuestionFactory.CreateQuestion(this._getNextOrdinalNumber()),
    );
  }

  public addMultipleChoiceQuestion(): void {
    this.form.controls.multipleChoiceQuestions.controls.push(
      QuizPersistFormMultipleChoiceQuestionFactory.CreateQuestion(this._getNextOrdinalNumber()),
    );
  }

  private _getNextOrdinalNumber(): number {
    const ordinalNumbers = this.form.controls.openQuestions.controls
      .map((c) => c.controls.ordinalNumber.value)
      .concat(this.form.controls.singleChoiceQuestions.controls.map((c) => c.controls.ordinalNumber.value))
      .concat(this.form.controls.multipleChoiceQuestions.controls.map((c) => c.controls.ordinalNumber.value));

    return (isEmpty(ordinalNumbers) ? 0 : Math.max(...ordinalNumbers)) + 1;
  }
}
