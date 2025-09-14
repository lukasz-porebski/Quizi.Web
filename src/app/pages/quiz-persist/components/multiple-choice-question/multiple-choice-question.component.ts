import { Component, input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TextInputComponent } from '../../../../../../common/components/inputs/text/text.component';
import { MatCard, MatCardContent } from '@angular/material/card';
import { IQuizPersistFormMultipleChoiceQuestion } from '../../interfaces/quiz-persist-form-multiple-choice-question.interface';
import { CheckboxComponent } from '../../../../../../common/components/inputs/checkbox/checkbox.component';

@Component({
  selector: 'app-quiz-persist-multiple-choice-question',
  imports: [TextInputComponent, MatCard, MatCardContent, CheckboxComponent],
  templateUrl: './multiple-choice-question.component.html',
  styleUrl: './multiple-choice-question.component.scss',
})
export class QuizPersistMultipleChoiceQuestionComponent {
  public formGroup = input.required<FormGroup<IQuizPersistFormMultipleChoiceQuestion>>();
}
