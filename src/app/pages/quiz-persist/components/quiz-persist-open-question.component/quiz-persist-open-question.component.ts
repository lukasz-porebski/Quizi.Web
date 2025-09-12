import { Component, input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IQuizPersistFormOpenQuestion } from '../../interfaces/quiz-persist-form-open-question.interface';
import { TextInputComponent } from '../../../../../../common/components/inputs/text/text.component';
import { TextareaInputComponent } from '../../../../../../common/components/inputs/textarea/textarea.component';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
  selector: 'app-quiz-persist-open-question',
  imports: [TextInputComponent, TextareaInputComponent, MatCard, MatCardContent],
  templateUrl: './quiz-persist-open-question.component.html',
  styleUrl: './quiz-persist-open-question.component.scss',
})
export class QuizPersistOpenQuestionComponent {
  public formGroup = input.required<FormGroup<IQuizPersistFormOpenQuestion>>();
}
