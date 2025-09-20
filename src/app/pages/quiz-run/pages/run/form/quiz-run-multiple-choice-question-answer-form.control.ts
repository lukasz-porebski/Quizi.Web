import { FormControl } from '@angular/forms';
import { QuizToRunClosedQuestionAnswerResponse } from '../models/responses/quiz-to-run-closed-question-answer.response';

// @ts-ignore
export class QuizRunMultipleChoiceQuestionAnswerFormControl extends FormControl<boolean> {
  public readonly response: QuizToRunClosedQuestionAnswerResponse;

  public constructor(response: QuizToRunClosedQuestionAnswerResponse) {
    super(false);
    this.response = response;
  }
}
