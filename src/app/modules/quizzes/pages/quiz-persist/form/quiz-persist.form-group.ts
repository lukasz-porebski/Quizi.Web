import { FormGroup, ValidatorFn } from '@angular/forms';
import { QuizPersistFormOpenQuestionFactory } from '@app/modules/quizzes/pages/quiz-persist/factories/quiz-persist-form-open-question.factory';
import { QuizPersistFormSingleChoiceQuestionFactory } from '@app/modules/quizzes/pages/quiz-persist/factories/quiz-persist-form-single-choice-question.factory';
import { QuizPersistFormMultipleChoiceQuestionFactory } from '@app/modules/quizzes/pages/quiz-persist/factories/quiz-persist-form-multiple-choice-question.factory';
import { isDefined, isEmpty } from '@common/utils/utils';
import { IQuizPersistForm } from '@app/modules/quizzes/pages/quiz-persist/interfaces/quiz-persist-form.interface';
import { QuizPersistConstants } from '@app/modules/quizzes/pages/quiz-persist/constants/quiz-persist.constants';
import { QuizPersistFormQuestion } from '@app/modules/quizzes/pages/quiz-persist/types/quiz-persist-form-question.type';
import { QuizPersistQuestionsHelper } from '@app/modules/quizzes/pages/quiz-persist/helpers/quiz-persist-questions.helper';
import { QuizPersistFormQuestionType } from '@app/modules/quizzes/pages/quiz-persist/enums/quiz-persist-question-type.enum';
import { Optional } from '@common/types/optional.type';

export class QuizPersistFormGroup extends FormGroup<IQuizPersistForm> {
  public constructor(controls: IQuizPersistForm, validatorOrOpts: ValidatorFn[]) {
    super(controls, validatorOrOpts);
  }

  public getQuestions(): QuizPersistFormQuestion[] {
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

    this.getQuestions().forEach((q, index) =>
      q.controls.ordinalNumber.setValue(index + QuizPersistConstants.MinOrdinalNumber),
    );
  }

  public moveForwardQuestion(question: QuizPersistFormQuestion): void {
    if (this.isFirstQuestion(question)) {
      return;
    }

    const questions = this.getQuestions();

    const tempOrdinalNumber = QuizPersistConstants.MinOrdinalNumber - 1;
    const targetOrdinalNumber = question.value.ordinalNumber! - 1;
    question.controls.ordinalNumber.setValue(tempOrdinalNumber);

    const questionIndex = questions.findIndex((q) => q.value.ordinalNumber === question.value.ordinalNumber);
    const previousQuestion = questions.at(questionIndex - 1)!;
    previousQuestion.controls.ordinalNumber.setValue(previousQuestion.value.ordinalNumber! + 1);

    question.controls.ordinalNumber.setValue(targetOrdinalNumber);
  }

  public moveBackQuestion(question: QuizPersistFormQuestion): void {
    if (this.isLastQuestion(question)) {
      return;
    }

    const questions = this.getQuestions();

    const tempOrdinalNumber = QuizPersistConstants.MinOrdinalNumber - 1;
    const targetOrdinalNumber = question.value.ordinalNumber! + 1;
    question.controls.ordinalNumber.setValue(tempOrdinalNumber);

    const questionIndex = questions.findIndex((q) => q.value.ordinalNumber === question.value.ordinalNumber);
    const nextQuestion = questions.at(questionIndex + 1)!;
    nextQuestion.controls.ordinalNumber.setValue(nextQuestion.value.ordinalNumber! - 1);

    question.controls.ordinalNumber.setValue(targetOrdinalNumber);
  }

  public isFirstQuestion(question: QuizPersistFormQuestion): boolean {
    return question.value.ordinalNumber === QuizPersistConstants.MinOrdinalNumber;
  }

  public isLastQuestion(question: QuizPersistFormQuestion): boolean {
    return question.value.ordinalNumber === this._tryGetLastQuestionOrdinalNumber();
  }

  private _getNextOrdinalNumber(): number {
    const ordinalNumber = this._tryGetLastQuestionOrdinalNumber();
    return isDefined(ordinalNumber) ? ordinalNumber + 1 : QuizPersistConstants.MinOrdinalNumber;
  }

  private _tryGetLastQuestionOrdinalNumber(): Optional<number> {
    const ordinalNumbers = this.getQuestions().map((q) => q.value.ordinalNumber!);
    return isEmpty(ordinalNumbers) ? null : Math.max(...ordinalNumbers);
  }
}
