import { QuizDetailsResponse } from '../models/quiz-details.response';
import { IQuizPersistForm } from '../interfaces/quiz -persist-form.interface';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IQuizPersistFormOpenQuestion } from '../interfaces/quiz -persist-form-open-question.interface';
import { IQuizPersistFormSingleChoiceQuestion } from '../interfaces/quiz-persist-form-single-choice-question.interface';
import { IQuizPersistFormChoiceQuestionAnswer } from '../interfaces/quiz-persist-form-choice-question-answer.interface';

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
      openQuestions: new FormArray<FormGroup<IQuizPersistFormOpenQuestion>>(
        (response?.openQuestions ?? []).map(
          (q) =>
            new FormGroup<IQuizPersistFormOpenQuestion>({
              text: new FormControl(q.text, {
                nonNullable: true,
                validators: [Validators.required],
              }),
              answer: new FormControl(q.answer, {
                nonNullable: true,
                validators: [Validators.required],
              }),
            }),
        ),
      ),
      singleChoiceQuestions: new FormArray<FormGroup<IQuizPersistFormSingleChoiceQuestion>>(
        (response?.singleChoiceQuestions ?? []).map(
          (q) =>
            new FormGroup<IQuizPersistFormSingleChoiceQuestion>({
              text: new FormControl(q.text, {
                nonNullable: true,
                validators: [Validators.required],
              }),
              answers: new FormArray<FormGroup<IQuizPersistFormChoiceQuestionAnswer>>(
                q.answers.map(
                  (a) =>
                    new FormGroup<IQuizPersistFormChoiceQuestionAnswer>({
                      no: new FormControl(a.no, {
                        validators: [Validators.required],
                      }),
                      text: new FormControl(a.text, {
                        nonNullable: true,
                        validators: [Validators.required],
                      }),
                    }),
                ),
              ),
              correctAnswerOrdinalNumber: new FormControl(q.answers.find((a) => a.isCorrect)!.ordinalNumber, {
                validators: [Validators.required],
              }),
            }),
        ),
      ),
    });
  }
}
