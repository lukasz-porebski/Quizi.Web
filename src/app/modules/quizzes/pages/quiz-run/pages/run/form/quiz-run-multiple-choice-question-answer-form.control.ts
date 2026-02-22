import { FormControl } from '@angular/forms';
import type { QuizToRunClosedQuestionAnswerResponse } from '@app/modules/quizzes/pages/quiz-run/pages/run/api/responses/quiz-to-run-closed-question-answer.response';

// @ts-expect-error TS2510
export class QuizRunMultipleChoiceQuestionAnswerFormControl extends FormControl<boolean> {
  public readonly response: QuizToRunClosedQuestionAnswerResponse;

  constructor(response: QuizToRunClosedQuestionAnswerResponse) {
    super(false);
    this.response = response;
  }
}
