import { QuizPersistQuestionFormGroup } from './quiz-persist-question.form-group';
import { QuizPersistFormMultipleChoiceQuestionFactory } from '../factories/quiz-persist-form-multiple-choice-question.factory';
import { IQuizPersistFormMultipleChoiceQuestion } from '../interfaces/quiz-persist-form-multiple-choice-question.interface';
import { QuizPersistChoiceQuestionsHelper } from '../helpers/quiz-persist-choice-questions.helper';
import { QuizPersistFormQuestionType } from '../enums/quiz-persist-question-type.enum';
import { ValidatorFn } from '@angular/forms';

export class QuizPersistMultipleChoiceQuestionFormGroup extends QuizPersistQuestionFormGroup<IQuizPersistFormMultipleChoiceQuestion> {
  constructor(controls: IQuizPersistFormMultipleChoiceQuestion, validatorOrOpts: ValidatorFn[]) {
    super(controls, QuizPersistFormQuestionType.MultipleChoice, validatorOrOpts);
  }

  public addAnswer(): void {
    this.controls.answers.push(
      QuizPersistFormMultipleChoiceQuestionFactory.CreateAnswer(
        QuizPersistChoiceQuestionsHelper.GetNextOrdinalNumber(this.controls),
      ),
    );
  }

  public removeAnswer(ordinalNumber: number): void {
    QuizPersistChoiceQuestionsHelper.RemoveAnswer(this.controls, ordinalNumber);
  }
}
