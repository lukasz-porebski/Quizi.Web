import { Component, effect, input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TextInputComponent } from '../../../../../../common/components/inputs/text/text.component';
import { MatCard, MatCardContent } from '@angular/material/card';
import { IQuizPersistFormSingleChoiceQuestion } from '../../interfaces/quiz-persist-form-single-choice-question.interface';
import { RadioComponent } from '../../../../../../common/components/inputs/radio/radio.component';
import { QuizPersistSingleChoiceQuestionRadioOption } from './models/quiz-persist-single-choice-question-radio-option.model';
import { InputColor } from '../../../../../../common/components/inputs/shared/enums/input-color.enum';

@Component({
  selector: 'app-quiz-persist-single-choice-question',
  imports: [TextInputComponent, MatCard, MatCardContent, RadioComponent],
  templateUrl: './quiz-persist-single-choice-question.component.html',
  styleUrl: './quiz-persist-single-choice-question.component.scss',
})
export class QuizPersistSingleChoiceQuestionComponent {
  public formGroup = input.required<FormGroup<IQuizPersistFormSingleChoiceQuestion>>();

  public readonly optionValue = (s: QuizPersistSingleChoiceQuestionRadioOption) => s.value;
  public readonly InputColor = InputColor;

  public options: QuizPersistSingleChoiceQuestionRadioOption[] = [];

  public constructor() {
    effect(() => {
      this.options = this.formGroup().controls.answers.controls.map(
        (c) => new QuizPersistSingleChoiceQuestionRadioOption(c.controls),
      );
    });
  }
}
