import { FormControl } from '@angular/forms';
import { QuizRunOpenQuestionVerificationResult } from '@app/modules/quizzes/pages/quiz-run/pages/open-questions-verification/enums/quiz-run-open-question-verification-result.enum';
import type { QuizToRunOpenQuestionResponse } from '@app/modules/quizzes/pages/quiz-run/pages/run/api/responses/quiz-to-run-open-question.response';
import type { Optional } from '@common/types/optional.type';

// @ts-expect-error TS2510
export class QuizRunOpenQuestionVerificationFormControl extends FormControl<QuizRunOpenQuestionVerificationResult> {
  constructor(
    public readonly response: QuizToRunOpenQuestionResponse,
    public readonly correctAnswer: string,
    public readonly userAnswer: Optional<string>,
  ) {
    super(QuizRunOpenQuestionVerificationResult.NoDecision);
  }
}
