import type { OnInit } from '@angular/core';
import { Component, input } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { CheckboxComponent } from '@common/components/inputs/checkbox/checkbox.component';
import { QuizQuestionType } from '@app/core/enums/quiz-question-type.enum';
import { InputColor } from '@common/components/inputs/shared/enums/input-color.enum';
import type { QuizResultDetailsOpenQuestionResponse } from '@app/modules/quiz-results/pages/quiz-result/api/responses/quiz-result-details-open-question.response';
import type { QuizResultDetailsSingleChoiceQuestionResponse } from '@app/modules/quiz-results/pages/quiz-result/api/responses/quiz-result-details-single-choice-question.response';
import type { QuizResultDetailsMultipleChoiceQuestionResponse } from '@app/modules/quiz-results/pages/quiz-result/api/responses/quiz-result-details-multiple-choice-question.response';
import type { IQuizResultQuestion } from '@app/modules/quiz-results/pages/quiz-result/components/question/interfaces/quiz-result-question.interface';
import type { IQuizResultSingleChoiceQuestionRadioOption } from '@app/modules/quiz-results/pages/quiz-result/components/question/interfaces/single-choice-question-radio-option.interface';
import { RadioComponent } from '@common/components/inputs/radio/radio.component';
import { MatDivider } from '@angular/material/divider';
import { TranslatePipe } from '@ngx-translate/core';
import type { QuizResultDetailsMultipleChoiceQuestionAnswerResponse } from '@app/modules/quiz-results/pages/quiz-result/api/responses/quiz-result-details-multiple-choice-question-answer.response';

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
  public readonly question = input.required<IQuizResultQuestion>();

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

  public getOptionValue(s: IQuizResultSingleChoiceQuestionRadioOption): number {
    return s.ordinalNumber;
  }

  public getOptionText(s: IQuizResultSingleChoiceQuestionRadioOption): string {
    return s.text;
  }

  public getOptionColor(s: IQuizResultSingleChoiceQuestionRadioOption): InputColor {
    return this.getClosedQuestionAnswerColor(s);
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

  public getOpenQuestionAnswerClassColor(data: QuizResultDetailsOpenQuestionResponse): string {
    let color = InputColor.Default;
    if (data.isCorrect === true) {
      color = InputColor.Green;
    } else if (data.isCorrect === false) {
      color = InputColor.Red;
    }

    return 'open-question-color-' + color;
  }

  public getClosedQuestionAnswerColor(
    data: QuizResultDetailsMultipleChoiceQuestionAnswerResponse | IQuizResultSingleChoiceQuestionRadioOption,
  ): InputColor {
    if (data.isCorrect) {
      return InputColor.Green;
    }

    return data.isSelected ? InputColor.Red : InputColor.Default;
  }
}
