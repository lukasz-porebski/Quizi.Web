import { Component, input } from '@angular/core';
import { QuizPersistSingleChoiceQuestionComponent } from '@app/modules/quizzes/pages/quiz-run/pages/run/components/single-choice-question/single-choice-question.component';
import { QuizQuestionType } from '@app/core/enums/quiz-question-type.enum';
import type { QuizRunMultipleChoiceQuestionFormArray } from '@app/modules/quizzes/pages/quiz-run/pages/run/form/quiz-run-multiple-choice-question-form.array';
import type { QuizRunSingleChoiceQuestionFormControl } from '@app/modules/quizzes/pages/quiz-run/pages/run/form/quiz-run-single-choice-question-form.control';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { Icon } from '@common/enums/icon.enum';
import type { QuizRunOpenQuestionFormControl } from '@app/modules/quizzes/pages/quiz-run/pages/run/form/quiz-run-open-question-form.control';
import type { IQuizRunFormOpenQuestion } from '@app/modules/quizzes/pages/quiz-run/pages/run/interfaces/quiz-run-form-question.interface';
import { TextareaInputComponent } from '@common/components/inputs/textarea/textarea.component';
import { CheckboxComponent } from '@common/components/inputs/checkbox/checkbox.component';

@Component({
  selector: 'app-quiz-run-question',
  imports: [
    QuizPersistSingleChoiceQuestionComponent,
    MatCard,
    MatCardContent,
    MatCardHeader,
    TextareaInputComponent,
    CheckboxComponent,
  ],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
})
export class QuizRunQuestionComponent {
  public readonly question = input.required<IQuizRunFormOpenQuestion>();

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
