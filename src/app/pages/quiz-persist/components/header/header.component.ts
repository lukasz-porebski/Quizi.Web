import { Component, input } from '@angular/core';
import { NumberInputComponent } from '../../../../../../common/components/inputs/number/number.component';
import { TextInputComponent } from '../../../../../../common/components/inputs/text/text.component';
import { QuizPersistFormGroup } from '../../form/quiz-persist.form-group';
import { CheckboxComponent } from '../../../../../../common/components/inputs/checkbox/checkbox.component';
import { SelectComponent } from '../../../../../../common/components/select/select.component';
import { SelectOptionModel } from '../../../../../../common/components/select/models/select-option.model';
import { QuizCopyMode } from '../../../quizzes/enums/quiz-copy-mode.enum';
import { TimeSpanComponent } from '../../../../../../common/components/time-span/time-span.component';

@Component({
  selector: 'app-quiz-persist-header',
  imports: [NumberInputComponent, TextInputComponent, CheckboxComponent, SelectComponent, TimeSpanComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class QuizPersistHeaderComponent {
  public form = input.required<QuizPersistFormGroup>();

  public copyModes: SelectOptionModel<QuizCopyMode>[] = [
    new SelectOptionModel({ text: 'DISABLED' }, QuizCopyMode.Disabled),
    new SelectOptionModel({ text: 'ONLY_FOR_ADDED_USER' }, QuizCopyMode.OnlyForAddedUsers),
    new SelectOptionModel({ text: 'FOR_ALL' }, QuizCopyMode.ForAll),
  ];
}
