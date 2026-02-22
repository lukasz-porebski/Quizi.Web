import { Component, input } from '@angular/core';
import { QuizPersistOpenQuestionComponent } from '@app/modules/quizzes/pages/quiz-persist/components/open-question/open-question.component';
import { QuizPersistSingleChoiceQuestionComponent } from '@app/modules/quizzes/pages/quiz-persist/components/single-choice-question/single-choice-question.component';
import { QuizPersistMultipleChoiceQuestionComponent } from '@app/modules/quizzes/pages/quiz-persist/components/multiple-choice-question/multiple-choice-question.component';
import { QuizPersistFormQuestion } from '@app/modules/quizzes/pages/quiz-persist/types/quiz-persist-form-question.type';
import { QuizPersistFormQuestionType } from '@app/modules/quizzes/pages/quiz-persist/enums/quiz-persist-question-type.enum';
import { QuizPersistMultipleChoiceQuestionFormGroup } from '@app/modules/quizzes/pages/quiz-persist/form/quiz-persist-multiple-choice-question.form-group';
import { QuizPersistSingleChoiceQuestionFormGroup } from '@app/modules/quizzes/pages/quiz-persist/form/quiz-persist-single-choice-question.form-group';
import { MatCard, MatCardContent } from '@angular/material/card';
import { ButtonComponent } from '@common/components/button/button.component';
import { Icon } from '@common/enums/icon.enum';
import { QuizPersistFormGroup } from '@app/modules/quizzes/pages/quiz-persist/form/quiz-persist.form-group';
import { TranslatePipe } from '@ngx-translate/core';
import { MatError } from '@angular/material/form-field';
import { QuizPersistOpenQuestionFormGroup } from '@app/modules/quizzes/pages/quiz-persist/form/quiz-persist-open-question.form-group';

@Component({
  selector: 'app-quiz-persist-question',
  imports: [
    QuizPersistOpenQuestionComponent,
    QuizPersistSingleChoiceQuestionComponent,
    QuizPersistMultipleChoiceQuestionComponent,
    MatCard,
    MatCardContent,
    ButtonComponent,
    MatError,
    TranslatePipe,
  ],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
})
export class QuizPersistQuestionComponent {
  public readonly form = input.required<QuizPersistFormGroup>();
  public readonly question = input.required<QuizPersistFormQuestion>();
  public readonly isPreview = input.required<boolean>();

  public readonly QuestionType = QuizPersistFormQuestionType;
  public readonly Icon = Icon;

  public castToOpenQuestion(): QuizPersistOpenQuestionFormGroup {
    return this.question() as QuizPersistOpenQuestionFormGroup;
  }

  public castToSingleChoiceQuestion(): QuizPersistSingleChoiceQuestionFormGroup {
    return this.question() as QuizPersistSingleChoiceQuestionFormGroup;
  }

  public castToMultipleChoiceQuestion(): QuizPersistMultipleChoiceQuestionFormGroup {
    return this.question() as QuizPersistMultipleChoiceQuestionFormGroup;
  }
}
