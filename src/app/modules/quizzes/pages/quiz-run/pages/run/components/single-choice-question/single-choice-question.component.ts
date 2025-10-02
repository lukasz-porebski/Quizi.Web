import { Component, input, OnInit } from '@angular/core';
import { RadioComponent } from '@common/components/inputs/radio/radio.component';
import { IQuizRunSingleChoiceQuestionRadioOption } from '@app/modules/quizzes/pages/quiz-run/pages/run/components/single-choice-question/interfaces/single-choice-question-radio-option.interface';
import { QuizRunSingleChoiceQuestionFormControl } from '@app/modules/quizzes/pages/quiz-run/pages/run/form/quiz-run-single-choice-question-form.control';

@Component({
  selector: 'app-quiz-run-single-choice-question',
  imports: [RadioComponent],
  templateUrl: './single-choice-question.component.html',
  styleUrl: './single-choice-question.component.scss',
})
export class QuizPersistSingleChoiceQuestionComponent implements OnInit {
  public question = input.required<QuizRunSingleChoiceQuestionFormControl>();

  public readonly optionValue = (s: IQuizRunSingleChoiceQuestionRadioOption) => s.no;
  public readonly optionText = (s: IQuizRunSingleChoiceQuestionRadioOption) => s.text;

  public options: IQuizRunSingleChoiceQuestionRadioOption[] = [];

  public ngOnInit(): void {
    this.options = this.question().response.answers.map((c) => {
      const result: IQuizRunSingleChoiceQuestionRadioOption = {
        no: c.no,
        ordinalNumber: c.ordinalNumber,
        text: c.text,
      };
      return result;
    });
  }
}
