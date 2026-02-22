import { Component, input } from '@angular/core';
import type { FormGroup } from '@angular/forms';
import type { IQuizPersistFormOpenQuestion } from '@app/modules/quizzes/pages/quiz-persist/interfaces/quiz-persist-form-open-question.interface';
import { TextInputComponent } from '@common/components/inputs/text/text.component';
import { TextareaInputComponent } from '@common/components/inputs/textarea/textarea.component';

@Component({
  selector: 'app-quiz-persist-open-question',
  imports: [TextInputComponent, TextareaInputComponent],
  templateUrl: './open-question.component.html',
  styleUrl: './open-question.component.scss',
})
export class QuizPersistOpenQuestionComponent {
  public readonly formGroup = input.required<FormGroup<IQuizPersistFormOpenQuestion>>();
  public readonly isPreview = input.required<boolean>();
}
