import { QuizToRunClosedQuestionResponse } from '../models/responses/quiz-to-run-closed-question.response';
import { FormControl } from '@angular/forms';
import { Optional } from '../../../../../common/types/optional.type';
import { QuizQuestionType } from '../../../core/enums/quiz-question-type.enum';
import { IQuizRunFormOpenQuestion } from '../interfaces/quiz-run-form-question.interface';

export class QuizRunSingleChoiceQuestionFormControl
  extends FormControl<Optional<number>>
  implements IQuizRunFormOpenQuestion
{
  public get ordinalNumber(): number {
    return this.response.ordinalNumber;
  }

  public readonly response: QuizToRunClosedQuestionResponse;
  public readonly type = QuizQuestionType.SingleChoice;

  public constructor(response: QuizToRunClosedQuestionResponse) {
    super(undefined);
    this.response = response;
  }
}
