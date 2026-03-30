import { Component, input } from '@angular/core';
import type { QuizPersistMultipleChoiceQuestionFormGroup } from '@app/modules/quizzes/pages/quiz-persist/form/quiz-persist-multiple-choice-question.form-group';
import { TranslatePipe } from '@ngx-translate/core';
import { MatError } from '@angular/material/form-field';
import { ButtonComponent, CheckboxComponent, Icon, TextInputComponent } from '@lukasz-porebski/lp-common';

@Component({
  selector: 'app-quiz-persist-multiple-choice-question',
  imports: [TextInputComponent, CheckboxComponent, ButtonComponent, MatError, TranslatePipe],
  templateUrl: './multiple-choice-question.component.html',
  styleUrl: './multiple-choice-question.component.scss',
})
export class QuizPersistMultipleChoiceQuestionComponent {
  public readonly formGroup = input.required<QuizPersistMultipleChoiceQuestionFormGroup>();
  public readonly isPreview = input.required<boolean>();

  public readonly Icon = Icon;
}
