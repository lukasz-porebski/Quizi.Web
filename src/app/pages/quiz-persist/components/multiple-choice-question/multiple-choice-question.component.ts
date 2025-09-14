import { Component, input } from '@angular/core';
import { TextInputComponent } from '../../../../../../common/components/inputs/text/text.component';
import { MatCard, MatCardContent } from '@angular/material/card';
import { CheckboxComponent } from '../../../../../../common/components/inputs/checkbox/checkbox.component';
import { ButtonComponent } from '../../../../../../common/components/button/button.component';
import { Icon } from '../../../../../../common/enums/icon.enum';
import { QuizPersistMultipleChoiceQuestionFormGroup } from '../../contexts/quiz-persist-multiple-choice-question.form-group';

@Component({
  selector: 'app-quiz-persist-multiple-choice-question',
  imports: [TextInputComponent, MatCard, MatCardContent, CheckboxComponent, ButtonComponent],
  templateUrl: './multiple-choice-question.component.html',
  styleUrl: './multiple-choice-question.component.scss',
})
export class QuizPersistMultipleChoiceQuestionComponent {
  public formGroup = input.required<QuizPersistMultipleChoiceQuestionFormGroup>();

  public readonly Icon = Icon;
}
