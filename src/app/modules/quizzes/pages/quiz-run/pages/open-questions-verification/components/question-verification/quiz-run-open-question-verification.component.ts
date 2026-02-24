import { Component, input } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import type { QuizRunOpenQuestionVerificationFormControl } from '@app/modules/quizzes/pages/quiz-run/pages/open-questions-verification/form/quiz-run-open-question-verification.form-control';
import { MatDivider } from '@angular/material/divider';
import { TranslatePipe } from '@ngx-translate/core';
import { RadioComponent } from '@common/components/inputs/radio/radio.component';
import type { IRadioOption } from '@common/components/inputs/radio/interfaces/radio-option.interface';
import { TextConfig } from '@common/models/text.config';
import { QuizRunOpenQuestionVerificationResult } from '@app/modules/quizzes/pages/quiz-run/pages/open-questions-verification/enums/quiz-run-open-question-verification-result.enum';

@Component({
  selector: 'app-quiz-run-open-question-verification',
  imports: [MatCard, MatCardContent, MatCardHeader, MatDivider, TranslatePipe, RadioComponent],
  templateUrl: './quiz-run-open-question-verification.component.html',
  styleUrl: './quiz-run-open-question-verification.component.scss',
})
export class QuizRunOpenQuestionVerificationComponent {
  public readonly question = input.required<QuizRunOpenQuestionVerificationFormControl>();

  public readonly getOptionValue = (
    s: IRadioOption<QuizRunOpenQuestionVerificationResult>,
  ): QuizRunOpenQuestionVerificationResult => s.value;
  public readonly getOptionText = (s: IRadioOption<QuizRunOpenQuestionVerificationResult>): TextConfig =>
    s.label;
  public readonly options: IRadioOption<QuizRunOpenQuestionVerificationResult>[] = [
    {
      label: new TextConfig({ text: 'CORRECT_V2' }),
      value: QuizRunOpenQuestionVerificationResult.Correct,
    },
    {
      label: new TextConfig({ text: 'INCORRECT' }),
      value: QuizRunOpenQuestionVerificationResult.Incorrect,
    },
    {
      label: new TextConfig({ text: 'HARD_TO_VERIFY' }),
      value: QuizRunOpenQuestionVerificationResult.NoDecision,
    },
  ];
}
