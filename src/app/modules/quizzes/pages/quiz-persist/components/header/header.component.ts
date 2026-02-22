import { Component, input } from '@angular/core';
import { NumberInputComponent } from '@common/components/inputs/number/number.component';
import { TextInputComponent } from '@common/components/inputs/text/text.component';
import { QuizPersistFormGroup } from '@app/modules/quizzes/pages/quiz-persist/form/quiz-persist.form-group';
import { CheckboxComponent } from '@common/components/inputs/checkbox/checkbox.component';
import { SelectComponent } from '@common/components/select/select.component';
import { SelectOptionModel } from '@common/components/select/models/select-option.model';
import { QuizCopyMode } from '@app/modules/quizzes/pages/quizzes/enums/quiz-copy-mode.enum';
import { TimeSpanComponent } from '@common/components/time-span/time-span.component';
import { QuizPersistConstants } from '@app/modules/quizzes/pages/quiz-persist/constants/quiz-persist.constants';
import { TextareaInputComponent } from '@common/components/inputs/textarea/textarea.component';

@Component({
  selector: 'app-quiz-persist-header',
  imports: [
    NumberInputComponent,
    TextInputComponent,
    CheckboxComponent,
    SelectComponent,
    TimeSpanComponent,
    TextareaInputComponent,
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
