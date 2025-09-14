import { QuizDetailsResponse } from '../models/quiz-details.response';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuizPersistQuestionFormGroup } from '../contexts/quiz-persist-question.form-group';
import { IQuizPersistFormOpenQuestion } from '../interfaces/quiz-persist-form-open-question.interface';
import { IQuizPersistFormSingleChoiceQuestion } from '../interfaces/quiz-persist-form-single-choice-question.interface';
import { IQuizPersistFormMultipleChoiceQuestion } from '../interfaces/quiz-persist-form-multiple-choice-question.interface';
import { IQuizPersistForm } from '../interfaces/quiz-persist-form.interface';
import { QuizPersistFormOpenQuestionFactory } from './quiz-persist-form-open-question.factory';
import { QuizPersistFormSingleChoiceQuestionFactory } from './quiz-persist-form-single-choice-question.factory';
import { QuizPersistFormMultipleChoiceQuestionFactory } from './quiz-persist-form-multiple-choice-question.factory';

export namespace QuizPersistFormFactory {
  export function Create(response?: QuizDetailsResponse): FormGroup<IQuizPersistForm> {
    return new FormGroup<IQuizPersistForm>({
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
      singleChoiceQuestions: new FormArray<
        QuizPersistQuestionFormGroup<IQuizPersistFormSingleChoiceQuestion>
      >(
        (response?.singleChoiceQuestions ?? []).map((q) =>
          QuizPersistFormSingleChoiceQuestionFactory.Create(q.ordinalNumber, q),
        ),
      ),
      multipleChoiceQuestions: new FormArray<
        QuizPersistQuestionFormGroup<IQuizPersistFormMultipleChoiceQuestion>
      >(
        (response?.multipleChoiceQuestions ?? []).map((q) =>
          QuizPersistFormMultipleChoiceQuestionFactory.Create(q.ordinalNumber, q),
        ),
      ),
    });
  }
}
