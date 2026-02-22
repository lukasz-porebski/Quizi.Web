import type { QuizToRunOpenQuestionResponse } from '@app/modules/quizzes/pages/quiz-run/pages/run/api/responses/quiz-to-run-open-question.response';
import { FormControl } from '@angular/forms';
import type { Optional } from '@common/types/optional.type';
import type { IQuizRunFormOpenQuestion } from '@app/modules/quizzes/pages/quiz-run/pages/run/interfaces/quiz-run-form-question.interface';
import { QuizQuestionType } from '@app/core/enums/quiz-question-type.enum';

export class QuizRunOpenQuestionFormControl
  extends FormControl<Optional<string>>
  implements IQuizRunFormOpenQuestion
{
  public get ordinalNumber(): number {
    return this.response.ordinalNumber;
  }

  public get text(): string {
    return this.response.text;
  }

  public readonly response: QuizToRunOpenQuestionResponse;
  public readonly type = QuizQuestionType.Open;

  constructor(response: QuizToRunOpenQuestionResponse) {
    super(undefined);
    this.response = response;
  }
}
