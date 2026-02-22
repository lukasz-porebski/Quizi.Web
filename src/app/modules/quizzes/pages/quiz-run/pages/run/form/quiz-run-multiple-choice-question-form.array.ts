import type { QuizToRunClosedQuestionResponse } from '@app/modules/quizzes/pages/quiz-run/pages/run/api/responses/quiz-to-run-closed-question.response';
import { FormArray } from '@angular/forms';
import { QuizRunMultipleChoiceQuestionAnswerFormControl } from '@app/modules/quizzes/pages/quiz-run/pages/run/form/quiz-run-multiple-choice-question-answer-form.control';
import { QuizQuestionType } from '@app/core/enums/quiz-question-type.enum';
import type { IQuizRunFormOpenQuestion } from '@app/modules/quizzes/pages/quiz-run/pages/run/interfaces/quiz-run-form-question.interface';

export class QuizRunMultipleChoiceQuestionFormArray
  extends FormArray<QuizRunMultipleChoiceQuestionAnswerFormControl>
  implements IQuizRunFormOpenQuestion
{
  public get ordinalNumber(): number {
    return this.response.ordinalNumber;
  }

  public get text(): string {
    return this.response.text;
  }

  public readonly response: QuizToRunClosedQuestionResponse;
  public readonly type = QuizQuestionType.MultipleChoice;

  constructor(response: QuizToRunClosedQuestionResponse) {
    super(response.answers.map((a) => new QuizRunMultipleChoiceQuestionAnswerFormControl(a)));
    this.response = response;
  }
}
