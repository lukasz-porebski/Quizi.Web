import { Component, input } from '@angular/core';
import { QuizPersistOpenQuestionComponent } from '../open-question/open-question.component';
import { QuizPersistSingleChoiceQuestionComponent } from '../single-choice-question/single-choice-question.component';
import { QuizPersistMultipleChoiceQuestionComponent } from '../multiple-choice-question/multiple-choice-question.component';
import { QuizPersistFormQuestion } from '../../types/quiz-persist-form-question.type';
import { QuizPersistFormQuestionType } from '../../enums/quiz-persist-question-type.enum';
import { QuizPersistMultipleChoiceQuestionFormGroup } from '../../form/quiz-persist-multiple-choice-question.form-group';
import { QuizPersistSingleChoiceQuestionFormGroup } from '../../form/quiz-persist-single-choice-question.form-group';
import { MatCard, MatCardContent } from '@angular/material/card';
import { ButtonComponent } from '../../../../../../../../common/components/button/button.component';
import { Icon } from '../../../../../../../../common/enums/icon.enum';
import { QuizPersistFormGroup } from '../../form/quiz-persist.form-group';
import { TranslatePipe } from '@ngx-translate/core';
import { MatError } from '@angular/material/form-field';
import { QuizPersistOpenQuestionFormGroup } from '../../form/quiz-persist-open-question.form-group';

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
  public form = input.required<QuizPersistFormGroup>();
  public question = input.required<QuizPersistFormQuestion>();
  public isPreview = input.required<boolean>();

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
