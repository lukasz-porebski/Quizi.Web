import { Component, input, OnInit } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { CheckboxComponent } from '../../../../../../common/components/inputs/checkbox/checkbox.component';
import { QuizQuestionType } from '../../../../core/enums/quiz-question-type.enum';
import { InputColor } from '../../../../../../common/components/inputs/shared/enums/input-color.enum';
import { QuizResultDetailsOpenQuestionResponse } from '../../models/responses/quiz-result-details-open-question.response';
import { QuizResultDetailsSingleChoiceQuestionResponse } from '../../models/responses/quiz-result-details-single-choice-question.response';
import { QuizResultDetailsMultipleChoiceQuestionResponse } from '../../models/responses/quiz-result-details-multiple-choice-question.response';
import { IQuizResultQuestion } from './interfaces/quiz-result-question.interface';
import { IQuizResultSingleChoiceQuestionRadioOption } from './interfaces/single-choice-question-radio-option.interface';
import { RadioComponent } from '../../../../../../common/components/inputs/radio/radio.component';
import { MatDivider } from '@angular/material/divider';
import { TranslatePipe } from '@ngx-translate/core';
import { QuizResultDetailsMultipleChoiceQuestionAnswerResponse } from '../../models/responses/quiz-result-details-multiple-choice-question-answer.response';

@Component({
  selector: 'app-quiz-result-question',
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    CheckboxComponent,
    RadioComponent,
    MatDivider,
    TranslatePipe,
  ],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
})
export class QuizResultQuestionComponent implements OnInit {
  public question = input.required<IQuizResultQuestion>();

  public readonly optionValue = (s: IQuizResultSingleChoiceQuestionRadioOption) => s.ordinalNumber;
  public readonly optionText = (s: IQuizResultSingleChoiceQuestionRadioOption) => s.text;
  public readonly optionColor = (s: IQuizResultSingleChoiceQuestionRadioOption) =>
    this.getClosedQuestionAnswerColor(s);
  public readonly QuestionType = QuizQuestionType;

  public type!: QuizQuestionType;
  public options: IQuizResultSingleChoiceQuestionRadioOption[] = [];

  public ngOnInit(): void {
    if (this.question().type === QuizQuestionType.SingleChoice) {
      const singleChoiceQuestion = this.castToSingleChoiceQuestion();
      this.options = singleChoiceQuestion.answers.map((c) => {
        const result: IQuizResultSingleChoiceQuestionRadioOption = {
          ordinalNumber: c.ordinalNumber,
          text: c.text,
          isCorrect: c.isCorrect,
          isSelected: singleChoiceQuestion.selectedAnswerOrdinalNumber === c.ordinalNumber,
        };
        return result;
      });
    }
  }

  public castToOpenQuestion(): QuizResultDetailsOpenQuestionResponse {
    return this.question().response as QuizResultDetailsOpenQuestionResponse;
  }

  public castToSingleChoiceQuestion(): QuizResultDetailsSingleChoiceQuestionResponse {
    return this.question().response as QuizResultDetailsSingleChoiceQuestionResponse;
  }

  public castToMultipleChoiceQuestion(): QuizResultDetailsMultipleChoiceQuestionResponse {
    return this.question().response as QuizResultDetailsMultipleChoiceQuestionResponse;
  }

  public getClosedQuestionAnswerColor(
    data: QuizResultDetailsMultipleChoiceQuestionAnswerResponse | IQuizResultSingleChoiceQuestionRadioOption,
  ): InputColor {
    if (data.isCorrect) {
      return InputColor.Green;
    }

    return !data.isCorrect && data.isSelected ? InputColor.Red : InputColor.Default;
  }
}
