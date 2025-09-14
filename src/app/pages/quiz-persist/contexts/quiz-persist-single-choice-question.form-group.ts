import { IQuizPersistFormSingleChoiceQuestion } from '../interfaces/quiz-persist-form-single-choice-question.interface';
import { QuizPersistQuestionFormGroup } from './quiz-persist-question.form-group';
import { QuizPersistFormSingleChoiceQuestionFactory } from '../factories/quiz-persist-form-single-choice-question.factory';
import { isEmpty } from '../../../../../common/utils/utils';
import { QuizPersistConstants } from '../constants/quiz-persist.constants';

export class QuizPersistSingleChoiceQuestionFormGroup extends QuizPersistQuestionFormGroup<IQuizPersistFormSingleChoiceQuestion> {
  public addAnswer(): void {
    this.controls.answers.push(
      QuizPersistFormSingleChoiceQuestionFactory.CreateAnswer(this._getNextOrdinalNumber()),
    );
  }

  public removeAnswer(ordinalNumber: number): void {
    const index = this.controls.answers.controls.findIndex(
      (a) => a.controls.ordinalNumber.value === ordinalNumber,
    );
    this.controls.answers.removeAt(index);

    this.controls.answers.controls.forEach((a, index) =>
      a.controls.ordinalNumber.setValue(index + QuizPersistConstants.MinOrdinalNumber),
    );
  }

  private _getNextOrdinalNumber(): number {
    const ordinalNumbers = this.controls.answers.controls.map((a) => a.controls.ordinalNumber.value);
    return (
      (isEmpty(ordinalNumbers) ? 0 : Math.max(...ordinalNumbers)) + QuizPersistConstants.MinOrdinalNumber
    );
  }
}
