import { FormGroup } from '@angular/forms';
import { QuizPersistFormOpenQuestionFactory } from '../factories/quiz-persist-form-open-question.factory';
import { QuizPersistFormSingleChoiceQuestionFactory } from '../factories/quiz-persist-form-single-choice-question.factory';
import { QuizPersistFormMultipleChoiceQuestionFactory } from '../factories/quiz-persist-form-multiple-choice-question.factory';
import { isEmpty } from '../../../../../common/utils/utils';
import { IQuizPersistForm } from '../interfaces/quiz-persist-form.interface';
import { QuizPersistConstants } from '../constants/quiz-persist.constants';
import { QuizPersistFormQuestion } from '../types/quiz-persist-form-question.type';
import { QuizPersistQuestionsHelper } from '../helpers/quiz-persist-questions.helper';
import { QuizPersistFormQuestionType } from '../enums/quiz-persist-question-type.enum';

export class QuizPersistFormGroup extends FormGroup<IQuizPersistForm> {
  public get questions(): QuizPersistFormQuestion[] {
    return QuizPersistQuestionsHelper.Merge(this);
  }

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

  public removeQuestion(question: QuizPersistFormQuestion): void {
    switch (question.type) {
      case QuizPersistFormQuestionType.Open:
        const openQuestionIndex = this.controls.openQuestions.controls.findIndex(
          (a) => a.controls.ordinalNumber.value === question.value.ordinalNumber,
        );
        this.controls.openQuestions.removeAt(openQuestionIndex);
        break;
      case QuizPersistFormQuestionType.SingleChoice:
        const singleChoiceIndex = this.controls.singleChoiceQuestions.controls.findIndex(
          (a) => a.controls.ordinalNumber.value === question.value.ordinalNumber,
        );
        this.controls.singleChoiceQuestions.removeAt(singleChoiceIndex);
        break;
      case QuizPersistFormQuestionType.MultipleChoice:
        const multipleChoiceIndex = this.controls.multipleChoiceQuestions.controls.findIndex(
          (a) => a.controls.ordinalNumber.value === question.value.ordinalNumber,
        );
        this.controls.multipleChoiceQuestions.removeAt(multipleChoiceIndex);
        break;
    }

    this.questions.forEach((q, index) =>
      q.controls.ordinalNumber.setValue(index + QuizPersistConstants.MinOrdinalNumber),
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
