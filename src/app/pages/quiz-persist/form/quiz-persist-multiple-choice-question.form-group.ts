import { QuizPersistQuestionFormGroup } from './quiz-persist-question.form-group';
import { QuizPersistFormMultipleChoiceQuestionFactory } from '../factories/quiz-persist-form-multiple-choice-question.factory';
import { IQuizPersistFormMultipleChoiceQuestion } from '../interfaces/quiz-persist-form-multiple-choice-question.interface';
import { QuizPersistChoiceQuestionsHelper } from '../helpers/quiz-persist-choice-questions.helper';

export class QuizPersistMultipleChoiceQuestionFormGroup extends QuizPersistQuestionFormGroup<IQuizPersistFormMultipleChoiceQuestion> {
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
