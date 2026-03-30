import { Component, input } from '@angular/core';
import type { QuizPersistFormGroup } from '@app/modules/quizzes/pages/quiz-persist/form/quiz-persist.form-group';
import { QuizCopyMode } from '@app/modules/quizzes/pages/quizzes/enums/quiz-copy-mode.enum';
import { QuizPersistConstants } from '@app/modules/quizzes/pages/quiz-persist/constants/quiz-persist.constants';
import {
  CheckboxComponent,
  NumberInputComponent,
  SelectComponent,
  SelectOptionModel,
  TextareaInputComponent,
  TextInputComponent,
  TimeSpanComponent,
} from '@lukasz-porebski/lp-common';

@Component({
  selector: 'app-quiz-persist-header',
  imports: [
    TextInputComponent,
    CheckboxComponent,
    TimeSpanComponent,
    TextareaInputComponent,
    NumberInputComponent,
    SelectComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class QuizPersistHeaderComponent {
  public readonly form = input.required<QuizPersistFormGroup>();
  public readonly isPreview = input.required<boolean>();

  public get maxQuestionsCountInRunningQuiz(): number {
    return this.form().getQuestions().length;
  }

  public readonly Constants = QuizPersistConstants;
  public readonly copyModes: SelectOptionModel<QuizCopyMode>[] = [
    new SelectOptionModel({ text: 'DISABLED' }, QuizCopyMode.Disabled),
    new SelectOptionModel({ text: 'ONLY_FOR_ADDED_USER' }, QuizCopyMode.OnlyForAddedUsers),
    new SelectOptionModel({ text: 'FOR_ALL' }, QuizCopyMode.ForAll),
  ];
}
