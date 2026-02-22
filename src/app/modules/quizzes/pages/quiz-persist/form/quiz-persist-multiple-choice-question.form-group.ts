import { QuizPersistQuestionFormGroup } from '@app/modules/quizzes/pages/quiz-persist/form/quiz-persist-question.form-group';
import { QuizPersistFormMultipleChoiceQuestionFactory } from '@app/modules/quizzes/pages/quiz-persist/factories/quiz-persist-form-multiple-choice-question.factory';
import type { IQuizPersistFormMultipleChoiceQuestion } from '@app/modules/quizzes/pages/quiz-persist/interfaces/quiz-persist-form-multiple-choice-question.interface';
import { QuizPersistCloasedQuestionsHelper } from '@app/modules/quizzes/pages/quiz-persist/helpers/quiz-persist-cloased-questions.helper';
import { QuizPersistFormQuestionType } from '@app/modules/quizzes/pages/quiz-persist/enums/quiz-persist-question-type.enum';
import type { ValidatorFn } from '@angular/forms';
import type { Optional } from '@common/types/optional.type';

export class QuizPersistMultipleChoiceQuestionFormGroup extends QuizPersistQuestionFormGroup<IQuizPersistFormMultipleChoiceQuestion> {
  public readonly no: Optional<number>;

  constructor(
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
