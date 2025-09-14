import { QuizDetailsResponse } from '../models/quiz-details.response';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { QuizPersistQuestionFormGroup } from '../form/quiz-persist-question.form-group';
import { IQuizPersistFormOpenQuestion } from '../interfaces/quiz-persist-form-open-question.interface';
import { QuizPersistFormOpenQuestionFactory } from './quiz-persist-form-open-question.factory';
import { QuizPersistFormSingleChoiceQuestionFactory } from './quiz-persist-form-single-choice-question.factory';
import { QuizPersistFormMultipleChoiceQuestionFactory } from './quiz-persist-form-multiple-choice-question.factory';
import { QuizPersistFormGroup } from '../form/quiz-persist.form-group';
import { QuizPersistSingleChoiceQuestionFormGroup } from '../form/quiz-persist-single-choice-question.form-group';
import { QuizPersistMultipleChoiceQuestionFormGroup } from '../form/quiz-persist-multiple-choice-question.form-group';
import { QuizCopyMode } from '../../quizzes/enums/quiz-copy-mode.enum';

export namespace QuizPersistFormFactory {
  export function Create(response?: QuizDetailsResponse): QuizPersistFormGroup {
    return new QuizPersistFormGroup({
      title: new FormControl(response?.title ?? '', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      questionsCountInRunningQuiz: new FormControl(response?.questionsCountInRunningQuiz, {
        validators: [Validators.required],
      }),
      randomQuestions: new FormControl(response?.randomQuestions ?? true, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      randomAnswers: new FormControl(response?.randomAnswers ?? true, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      negativePoints: new FormControl(response?.negativePoints ?? false, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      copyMode: new FormControl(response?.copyMode ?? QuizCopyMode.OnlyForAddedUsers, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      openQuestions: new FormArray<QuizPersistQuestionFormGroup<IQuizPersistFormOpenQuestion>>(
        (response?.openQuestions ?? []).map((q) =>
          QuizPersistFormOpenQuestionFactory.Create(q.ordinalNumber, q),
        ),
      ),
      singleChoiceQuestions: new FormArray<QuizPersistSingleChoiceQuestionFormGroup>(
        (response?.singleChoiceQuestions ?? []).map((q) =>
          QuizPersistFormSingleChoiceQuestionFactory.CreateQuestion(q.ordinalNumber, q),
        ),
      ),
      multipleChoiceQuestions: new FormArray<QuizPersistMultipleChoiceQuestionFormGroup>(
        (response?.multipleChoiceQuestions ?? []).map((q) =>
          QuizPersistFormMultipleChoiceQuestionFactory.CreateQuestion(q.ordinalNumber, q),
        ),
      ),
    });
  }
}
