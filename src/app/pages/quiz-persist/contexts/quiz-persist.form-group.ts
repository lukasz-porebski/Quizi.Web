import { FormGroup } from '@angular/forms';
import { QuizPersistFormOpenQuestionFactory } from '../factories/quiz-persist-form-open-question.factory';
import { QuizPersistFormSingleChoiceQuestionFactory } from '../factories/quiz-persist-form-single-choice-question.factory';
import { QuizPersistFormMultipleChoiceQuestionFactory } from '../factories/quiz-persist-form-multiple-choice-question.factory';
import { isEmpty } from '../../../../../common/utils/utils';
import { IQuizPersistForm } from '../interfaces/quiz-persist-form.interface';
import { QuizPersistConstants } from '../constants/quiz-persist.constants';

export class QuizPersistFormGroup extends FormGroup<IQuizPersistForm> {
  public addOpenQuestion(): void {
    this.controls.openQuestions.controls.push(
      QuizPersistFormOpenQuestionFactory.Create(this._getNextOrdinalNumber()),
    );
  }

  public addSingleChoiceQuestion(): void {
    this.controls.singleChoiceQuestions.controls.push(
      QuizPersistFormSingleChoiceQuestionFactory.CreateQuestion(this._getNextOrdinalNumber()),
    );
  }

  public addMultipleChoiceQuestion(): void {
    this.controls.multipleChoiceQuestions.controls.push(
      QuizPersistFormMultipleChoiceQuestionFactory.CreateQuestion(this._getNextOrdinalNumber()),
    );
  }

  private _getNextOrdinalNumber(): number {
    const ordinalNumbers = this.controls.openQuestions.controls
      .map((c) => c.controls.ordinalNumber.value)
      .concat(this.controls.singleChoiceQuestions.controls.map((c) => c.controls.ordinalNumber.value))
      .concat(this.controls.multipleChoiceQuestions.controls.map((c) => c.controls.ordinalNumber.value));

    return isEmpty(ordinalNumbers) ? QuizPersistConstants.MinOrdinalNumber : Math.max(...ordinalNumbers) + 1;
  }
}
