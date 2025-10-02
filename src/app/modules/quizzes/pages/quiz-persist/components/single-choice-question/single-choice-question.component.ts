import { Component, input, OnDestroy, OnInit } from '@angular/core';
import { TextInputComponent } from '@common/components/inputs/text/text.component';
import { RadioComponent } from '@common/components/inputs/radio/radio.component';
import { QuizPersistSingleChoiceQuestionRadioOption } from '@app/modules/quizzes/pages/quiz-persist/components/single-choice-question/models/single-choice-question-radio-option.model';
import { ButtonComponent } from '@common/components/button/button.component';
import { Icon } from '@common/enums/icon.enum';
import { QuizPersistSingleChoiceQuestionFormGroup } from '@app/modules/quizzes/pages/quiz-persist/form/quiz-persist-single-choice-question.form-group';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';
import { MatError } from '@angular/material/form-field';

@Component({
  selector: 'app-quiz-persist-single-choice-question',
  imports: [TextInputComponent, RadioComponent, ButtonComponent, MatError, TranslatePipe],
  templateUrl: './single-choice-question.component.html',
  styleUrl: './single-choice-question.component.scss',
})
export class QuizPersistSingleChoiceQuestionComponent implements OnInit, OnDestroy {
  public formGroup = input.required<QuizPersistSingleChoiceQuestionFormGroup>();
  public isPreview = input.required<boolean>();

  public readonly optionValue = (s: QuizPersistSingleChoiceQuestionRadioOption) => s.ordinalNumber;
  public readonly Icon = Icon;

  public options: QuizPersistSingleChoiceQuestionRadioOption[] = [];

  private _answersSub!: Subscription;

  public ngOnInit(): void {
    this._setOptions();
    this._answersSub = this.formGroup().controls.answers.valueChanges.subscribe(() => this._setOptions());
  }

  public ngOnDestroy(): void {
    this._answersSub.unsubscribe();
  }

  private _setOptions(): void {
    this.options = this.formGroup().controls.answers.controls.map(
      (c) => new QuizPersistSingleChoiceQuestionRadioOption(c.controls),
    );
  }
}
