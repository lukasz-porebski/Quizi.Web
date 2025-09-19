import { QuizToRunOpenQuestionResponse } from '../models/responses/quiz-to-run-open-question.response';
import { FormControl } from '@angular/forms';
import { Optional } from '../../../../../common/types/optional.type';
import { IQuizRunFormOpenQuestion } from '../interfaces/quiz-run-form-question.interface';
import { QuizQuestionType } from '../../../core/enums/quiz-question-type.enum';

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

  public constructor(response: QuizToRunOpenQuestionResponse) {
    super(undefined);
    this.response = response;
  }
}
