import { Component, input } from '@angular/core';
import { QuizRunOpenQuestionComponent } from '../open-question/open-question.component';
import { QuizPersistSingleChoiceQuestionComponent } from '../single-choice-question/single-choice-question.component';
import { QuizRunMultipleChoiceQuestionComponent } from '../multiple-choice-question/multiple-choice-question.component';
import { QuizQuestionType } from '../../../../core/enums/quiz-question-type.enum';
import { QuizRunMultipleChoiceQuestionFormArray } from '../../form/quiz-run-multiple-choice-question-form.array';
import { QuizRunSingleChoiceQuestionFormControl } from '../../form/quiz-run-single-choice-question-form.control';
import { MatCard, MatCardContent } from '@angular/material/card';
import { Icon } from '../../../../../../common/enums/icon.enum';
import { QuizRunOpenQuestionFormControl } from '../../form/quiz-run-open-question-form.control';
import { IQuizRunFormOpenQuestion } from '../../interfaces/quiz-run-form-question.interface';

@Component({
  selector: 'app-quiz-run-question',
  imports: [
    QuizRunOpenQuestionComponent,
    QuizPersistSingleChoiceQuestionComponent,
    QuizRunMultipleChoiceQuestionComponent,
    MatCard,
    MatCardContent,
  ],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
})
export class QuizRunQuestionComponent {
  public question = input.required<IQuizRunFormOpenQuestion>();

  public readonly QuestionType = QuizQuestionType;
  public readonly Icon = Icon;

  public castToOpenQuestion(): QuizRunOpenQuestionFormControl {
    return this.question() as QuizRunOpenQuestionFormControl;
  }

  public castToSingleChoiceQuestion(): QuizRunSingleChoiceQuestionFormControl {
    return this.question() as QuizRunSingleChoiceQuestionFormControl;
  }

  public castToMultipleChoiceQuestion(): QuizRunMultipleChoiceQuestionFormArray {
    return this.question() as QuizRunMultipleChoiceQuestionFormArray;
  }
}
