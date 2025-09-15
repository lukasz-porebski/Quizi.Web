import { IQuizPersistFormSingleChoiceQuestion } from '../interfaces/quiz-persist-form-single-choice-question.interface';
import { QuizPersistQuestionFormGroup } from './quiz-persist-question.form-group';
import { QuizPersistFormSingleChoiceQuestionFactory } from '../factories/quiz-persist-form-single-choice-question.factory';
import { QuizPersistChoiceQuestionsHelper } from '../helpers/quiz-persist-choice-questions.helper';
import { QuizPersistFormQuestionType } from '../enums/quiz-persist-question-type.enum';
import { ValidatorFn } from '@angular/forms';

export class QuizPersistSingleChoiceQuestionFormGroup extends QuizPersistQuestionFormGroup<IQuizPersistFormSingleChoiceQuestion> {
  public constructor(controls: IQuizPersistFormSingleChoiceQuestion, validatorOrOpts?: ValidatorFn[]) {
    super(controls, QuizPersistFormQuestionType.SingleChoice, validatorOrOpts);
  }

  public addAnswer(): void {
    this.controls.answers.push(
      QuizPersistFormSingleChoiceQuestionFactory.CreateAnswer(
        QuizPersistChoiceQuestionsHelper.GetNextOrdinalNumber(this.controls),
      ),
    );
  }

  public removeAnswer(ordinalNumber: number): void {
    QuizPersistChoiceQuestionsHelper.RemoveAnswer(this.controls, ordinalNumber);
  }
}
