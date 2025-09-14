import { QuizDetailsResponse } from '../models/quiz-details.response';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { QuizPersistQuestionFormGroup } from '../contexts/quiz-persist-question.form-group';
import { IQuizPersistFormOpenQuestion } from '../interfaces/quiz-persist-form-open-question.interface';
import { IQuizPersistFormMultipleChoiceQuestion } from '../interfaces/quiz-persist-form-multiple-choice-question.interface';
import { QuizPersistFormOpenQuestionFactory } from './quiz-persist-form-open-question.factory';
import { QuizPersistFormSingleChoiceQuestionFactory } from './quiz-persist-form-single-choice-question.factory';
import { QuizPersistFormMultipleChoiceQuestionFactory } from './quiz-persist-form-multiple-choice-question.factory';
import { QuizPersistFormGroup } from '../contexts/quiz-persist.form-group';
import { QuizPersistSingleChoiceQuestionFormGroup } from '../contexts/quiz-persist-single-choice-question.form-group';

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
      multipleChoiceQuestions: new FormArray<
        QuizPersistQuestionFormGroup<IQuizPersistFormMultipleChoiceQuestion>
      >(
        (response?.multipleChoiceQuestions ?? []).map((q) =>
          QuizPersistFormMultipleChoiceQuestionFactory.CreateQuestion(q.ordinalNumber, q),
        ),
      ),
    });
  }
}
