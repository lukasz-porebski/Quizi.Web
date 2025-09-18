import { Component, input } from '@angular/core';
import { CheckboxComponent } from '../../../../../../common/components/inputs/checkbox/checkbox.component';
import { Icon } from '../../../../../../common/enums/icon.enum';
import { QuizRunMultipleChoiceQuestionFormArray } from '../../form/quiz-run-multiple-choice-question-form.array';

@Component({
  selector: 'app-quiz-run-multiple-choice-question',
  imports: [CheckboxComponent],
  templateUrl: './multiple-choice-question.component.html',
  styleUrl: './multiple-choice-question.component.scss',
})
export class QuizRunMultipleChoiceQuestionComponent {
  public question = input.required<QuizRunMultipleChoiceQuestionFormArray>();

  public readonly Icon = Icon;
}
