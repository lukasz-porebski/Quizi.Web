import { IQuizPersistFormSingleChoiceQuestion } from '@app/modules/quizzes/pages/quiz-persist/interfaces/quiz-persist-form-single-choice-question.interface';
import { QuizPersistQuestionFormGroup } from '@app/modules/quizzes/pages/quiz-persist/form/quiz-persist-question.form-group';
import { QuizPersistFormSingleChoiceQuestionFactory } from '@app/modules/quizzes/pages/quiz-persist/factories/quiz-persist-form-single-choice-question.factory';
import { QuizPersistCloasedQuestionsHelper } from '@app/modules/quizzes/pages/quiz-persist/helpers/quiz-persist-cloased-questions.helper';
import { QuizPersistFormQuestionType } from '@app/modules/quizzes/pages/quiz-persist/enums/quiz-persist-question-type.enum';
import { ValidatorFn } from '@angular/forms';
import { Optional } from '@common/types/optional.type';

export class QuizPersistSingleChoiceQuestionFormGroup extends QuizPersistQuestionFormGroup<IQuizPersistFormSingleChoiceQuestion> {
  public readonly no: Optional<number>;

  constructor(
    controls: IQuizPersistFormSingleChoiceQuestion,
    no: Optional<number>,
    validatorOrOpts: ValidatorFn[],
  ) {
    super(controls, QuizPersistFormQuestionType.SingleChoice, validatorOrOpts);
    this.no = no;
  }

  public addAnswer(): void {
    this.controls.answers.push(
      QuizPersistFormSingleChoiceQuestionFactory.CreateAnswer(
        QuizPersistCloasedQuestionsHelper.GetNextOrdinalNumber(this.controls),
      ),
    );
  }

  public removeAnswer(ordinalNumber: number): void {
    QuizPersistCloasedQuestionsHelper.RemoveAnswer(this.controls, ordinalNumber);
  }
}
