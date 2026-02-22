import type { QuizToRunClosedQuestionResponse } from '@app/modules/quizzes/pages/quiz-run/pages/run/api/responses/quiz-to-run-closed-question.response';
import { FormControl } from '@angular/forms';
import type { Optional } from '@common/types/optional.type';
import { QuizQuestionType } from '@app/core/enums/quiz-question-type.enum';
import type { IQuizRunFormOpenQuestion } from '@app/modules/quizzes/pages/quiz-run/pages/run/interfaces/quiz-run-form-question.interface';

export class QuizRunSingleChoiceQuestionFormControl
  extends FormControl<Optional<number>>
  implements IQuizRunFormOpenQuestion
{
  public get ordinalNumber(): number {
    return this.response.ordinalNumber;
  }

  public get text(): string {
    return this.response.text;
  }

  public readonly response: QuizToRunClosedQuestionResponse;
  public readonly type = QuizQuestionType.SingleChoice;

  constructor(response: QuizToRunClosedQuestionResponse) {
    super(undefined);
    this.response = response;
  }
}
