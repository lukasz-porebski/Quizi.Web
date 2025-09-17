import { QuizPersistQuestionFormGroup } from './quiz-persist-question.form-group';
import { QuizPersistFormMultipleChoiceQuestionFactory } from '../factories/quiz-persist-form-multiple-choice-question.factory';
import { IQuizPersistFormMultipleChoiceQuestion } from '../interfaces/quiz-persist-form-multiple-choice-question.interface';
import { QuizPersistCloasedQuestionsHelper } from '../helpers/quiz-persist-cloased-questions.helper';
import { QuizPersistFormQuestionType } from '../enums/quiz-persist-question-type.enum';
import { ValidatorFn } from '@angular/forms';
import { Optional } from '../../../../../common/types/optional.type';

export class QuizPersistMultipleChoiceQuestionFormGroup extends QuizPersistQuestionFormGroup<IQuizPersistFormMultipleChoiceQuestion> {
  public readonly no: Optional<number>;

  public constructor(
    controls: IQuizPersistFormMultipleChoiceQuestion,
    no: Optional<number>,
    validatorOrOpts: ValidatorFn[],
  ) {
    super(controls, QuizPersistFormQuestionType.MultipleChoice, validatorOrOpts);
    this.no = no;
  }

  public addAnswer(): void {
    this.controls.answers.push(
      QuizPersistFormMultipleChoiceQuestionFactory.CreateAnswer(
        QuizPersistCloasedQuestionsHelper.GetNextOrdinalNumber(this.controls),
      ),
    );
  }

  public removeAnswer(ordinalNumber: number): void {
    QuizPersistCloasedQuestionsHelper.RemoveAnswer(this.controls, ordinalNumber);
  }
}
