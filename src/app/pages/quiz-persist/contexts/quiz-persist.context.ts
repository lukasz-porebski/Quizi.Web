import { QuizDetailsResponse } from '../models/quiz-details.response';
import { IQuizPersistForm } from '../interfaces/quiz-persist-form.interface';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IQuizPersistFormOpenQuestion } from '../interfaces/quiz-persist-form-open-question.interface';
import { IQuizPersistFormSingleChoiceQuestion } from '../interfaces/quiz-persist-form-single-choice-question.interface';
import { IQuizPersistFormSingleChoiceQuestionAnswer } from '../interfaces/quiz-persist-form-single-choice-question-answer.interface';
import { IQuizPersistFormMultipleChoiceQuestion } from '../interfaces/quiz-persist-form-multiple-choice-question.interface';
import { IQuizPersistFormMultipleChoiceQuestionAnswer } from '../interfaces/quiz-persist-form-multiple-choice-question-answer.interface';
import { QuizPersistQuestionFormGroup } from './quiz-persist-question.form-group';
import { QuizPersistFormQuestionType } from '../enums/quiz-persist-question-type.enum';

export class QuizPersistContext {
  public form: FormGroup<IQuizPersistForm>;

  public constructor(response?: QuizDetailsResponse) {
    this.form = new FormGroup({
      title: new FormControl(response?.title ?? '', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      questionsCountInRunningQuiz: new FormControl(response?.questionsCountInRunningQuiz, {
        validators: [Validators.required],
      }),
      openQuestions: new FormArray<QuizPersistQuestionFormGroup<IQuizPersistFormOpenQuestion>>(
        (response?.openQuestions ?? []).map(
          (q) =>
            new QuizPersistQuestionFormGroup<IQuizPersistFormOpenQuestion>(
              {
                ordinalNumber: new FormControl(q.ordinalNumber, {
                  nonNullable: true,
                  validators: [Validators.required],
                }),
                text: new FormControl(q.text, {
                  nonNullable: true,
                  validators: [Validators.required],
                }),
                answer: new FormControl(q.answer, {
                  nonNullable: true,
                  validators: [Validators.required],
                }),
              },
              QuizPersistFormQuestionType.Open,
            ),
        ),
      ),
      singleChoiceQuestions: new FormArray<
        QuizPersistQuestionFormGroup<IQuizPersistFormSingleChoiceQuestion>
      >(
        (response?.singleChoiceQuestions ?? []).map(
          (q) =>
            new QuizPersistQuestionFormGroup<IQuizPersistFormSingleChoiceQuestion>(
              {
                ordinalNumber: new FormControl(q.ordinalNumber, {
                  nonNullable: true,
                  validators: [Validators.required],
                }),
                text: new FormControl(q.text, {
                  nonNullable: true,
                  validators: [Validators.required],
                }),
                answers: new FormArray<FormGroup<IQuizPersistFormSingleChoiceQuestionAnswer>>(
                  q.answers.map(
                    (a) =>
                      new FormGroup<IQuizPersistFormSingleChoiceQuestionAnswer>({
                        no: new FormControl(a.ordinalNumber, {
                          validators: [Validators.required],
                        }),
                        text: new FormControl(a.text, {
                          nonNullable: true,
                          validators: [Validators.required],
                        }),
                      }),
                  ),
                ),
                correctAnswerOrdinalNumber: new FormControl(
                  q.answers.find((a) => a.isCorrect)!.ordinalNumber,
                  {
                    validators: [Validators.required],
                  },
                ),
              },
              QuizPersistFormQuestionType.SingleChoice,
            ),
        ),
      ),
      multipleChoiceQuestions: new FormArray<
        QuizPersistQuestionFormGroup<IQuizPersistFormMultipleChoiceQuestion>
      >(
        (response?.multipleChoiceQuestions ?? []).map(
          (q) =>
            new QuizPersistQuestionFormGroup<IQuizPersistFormMultipleChoiceQuestion>(
              {
                ordinalNumber: new FormControl(q.ordinalNumber, {
                  nonNullable: true,
                  validators: [Validators.required],
                }),
                text: new FormControl(q.text, {
                  nonNullable: true,
                  validators: [Validators.required],
                }),
                answers: new FormArray<FormGroup<IQuizPersistFormMultipleChoiceQuestionAnswer>>(
                  q.answers.map(
                    (a) =>
                      new FormGroup<IQuizPersistFormMultipleChoiceQuestionAnswer>({
                        no: new FormControl(a.ordinalNumber, {
                          validators: [Validators.required],
                        }),
                        text: new FormControl(a.text, {
                          nonNullable: true,
                          validators: [Validators.required],
                        }),
                        isCorrect: new FormControl(a.isCorrect, {
                          nonNullable: true,
                          validators: [Validators.required],
                        }),
                      }),
                  ),
                ),
              },
              QuizPersistFormQuestionType.MultipleChoice,
            ),
        ),
      ),
    });
  }
}
