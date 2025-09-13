import { Component, input } from '@angular/core';
import { QuizPersistOpenQuestionComponent } from '../quiz-persist-open-question.component/quiz-persist-open-question.component';
import { QuizPersistSingleChoiceQuestionComponent } from '../quiz-persist-single-choice-question/quiz-persist-single-choice-question.component';
import { QuizPersistMultipleChoiceQuestionComponent } from '../quiz-persist-multiple-choice-question/quiz-persist-multiple-choice-question.component';
import { QuizPersistFormQuestion } from '../../types/quiz-persist-form-question.type';
import { QuizPersistFormQuestionType } from '../../enums/quiz-persist-question-type.enum';
import { QuizPersistQuestionFormGroup } from '../../contexts/quiz-persist-question.form-group';
import { IQuizPersistFormOpenQuestion } from '../../interfaces/quiz-persist-form-open-question.interface';
import { IQuizPersistFormSingleChoiceQuestion } from '../../interfaces/quiz-persist-form-single-choice-question.interface';
import { IQuizPersistFormMultipleChoiceQuestion } from '../../interfaces/quiz-persist-form-multiple-choice-question.interface';

@Component({
  selector: 'app-quiz-persist-question',
  imports: [
    QuizPersistOpenQuestionComponent,
    QuizPersistSingleChoiceQuestionComponent,
    QuizPersistMultipleChoiceQuestionComponent,
  ],
  templateUrl: './quiz-persist-question.component.html',
  styleUrl: './quiz-persist-question.component.scss',
})
export class QuizPersistQuestionComponent {
  public question = input.required<QuizPersistFormQuestion>();

  public QuestionType = QuizPersistFormQuestionType;

  public castToOpenQuestion(): QuizPersistQuestionFormGroup<IQuizPersistFormOpenQuestion> {
    return this.question() as QuizPersistQuestionFormGroup<IQuizPersistFormOpenQuestion>;
  }

  public castToSingleChoiceQuestion(): QuizPersistQuestionFormGroup<IQuizPersistFormSingleChoiceQuestion> {
    return this.question() as QuizPersistQuestionFormGroup<IQuizPersistFormSingleChoiceQuestion>;
  }

  public castToMultipleChoiceQuestion(): QuizPersistQuestionFormGroup<IQuizPersistFormMultipleChoiceQuestion> {
    return this.question() as QuizPersistQuestionFormGroup<IQuizPersistFormMultipleChoiceQuestion>;
  }
}
