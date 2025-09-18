import { Component, input } from '@angular/core';
import { TextareaInputComponent } from '../../../../../../common/components/inputs/textarea/textarea.component';
import { QuizRunOpenQuestionFormControl } from '../../form/quiz-run-open-question-form.control';

@Component({
  selector: 'app-quiz-run-open-question',
  imports: [TextareaInputComponent],
  templateUrl: './open-question.component.html',
  styleUrl: './open-question.component.scss',
})
export class QuizRunOpenQuestionComponent {
  public question = input.required<QuizRunOpenQuestionFormControl>();
}
