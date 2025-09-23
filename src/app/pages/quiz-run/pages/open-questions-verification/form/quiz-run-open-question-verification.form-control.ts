import { FormControl } from '@angular/forms';
import { QuizRunOpenQuestionVerificationResult } from '../enums/quiz-run-open-question-verification-result.enum';
import { QuizToRunOpenQuestionResponse } from '../../run/models/responses/quiz-to-run-open-question.response';
import { Optional } from '../../../../../../../common/types/optional.type';

// @ts-ignore
export class QuizRunOpenQuestionVerificationFormControl extends FormControl<QuizRunOpenQuestionVerificationResult> {
  public constructor(
    public readonly response: QuizToRunOpenQuestionResponse,
    public readonly correctAnswer: string,
    public readonly userAnswer: Optional<string>,
  ) {
    super(QuizRunOpenQuestionVerificationResult.NoDecision);
  }
}
