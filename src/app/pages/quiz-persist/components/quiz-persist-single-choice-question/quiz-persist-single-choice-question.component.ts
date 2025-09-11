import { Component, input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TextInputComponent } from '../../../../../../common/components/inputs/text/text.component';
import { MatCard, MatCardContent } from '@angular/material/card';
import { IQuizPersistFormSingleChoiceQuestion } from '../../interfaces/quiz-persist-form-single-choice-question.interface';

@Component({
  selector: 'app-quiz-persist-single-choice-question',
  imports: [TextInputComponent, MatCard, MatCardContent],
  templateUrl: './quiz-persist-single-choice-question.component.html',
  styleUrl: './quiz-persist-single-choice-question.component.scss',
})
export class QuizPersistSingleChoiceQuestionComponent {
  public formGroup = input.required<FormGroup<IQuizPersistFormSingleChoiceQuestion>>();
}
