import { Component, input } from '@angular/core';
import { TextInputComponent } from '../../../../../../common/components/inputs/text/text.component';
import { CheckboxComponent } from '../../../../../../common/components/inputs/checkbox/checkbox.component';
import { ButtonComponent } from '../../../../../../common/components/button/button.component';
import { Icon } from '../../../../../../common/enums/icon.enum';
import { QuizPersistMultipleChoiceQuestionFormGroup } from '../../form/quiz-persist-multiple-choice-question.form-group';
import { TranslatePipe } from '@ngx-translate/core';
import { MatError } from '@angular/material/form-field';

@Component({
  selector: 'app-quiz-persist-multiple-choice-question',
  imports: [TextInputComponent, CheckboxComponent, ButtonComponent, MatError, TranslatePipe],
  templateUrl: './multiple-choice-question.component.html',
  styleUrl: './multiple-choice-question.component.scss',
})
export class QuizPersistMultipleChoiceQuestionComponent {
  public formGroup = input.required<QuizPersistMultipleChoiceQuestionFormGroup>();

  public readonly Icon = Icon;
}
