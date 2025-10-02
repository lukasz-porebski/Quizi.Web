import { QuizToRunClosedQuestionResponse } from '../models/responses/quiz-to-run-closed-question.response';
import { FormArray } from '@angular/forms';
import { QuizRunMultipleChoiceQuestionAnswerFormControl } from './quiz-run-multiple-choice-question-answer-form.control';
import { QuizQuestionType } from '../../../../../../../core/enums/quiz-question-type.enum';
import { IQuizRunFormOpenQuestion } from '../interfaces/quiz-run-form-question.interface';

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

  public constructor(response: QuizToRunClosedQuestionResponse) {
    super(response.answers.map((a) => new QuizRunMultipleChoiceQuestionAnswerFormControl(a)));
    this.response = response;
  }
}
