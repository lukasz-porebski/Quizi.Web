import { QuizDetailsResponse } from '../models/responses/quiz-details.response';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuizPersistFormOpenQuestionFactory } from './quiz-persist-form-open-question.factory';
import { QuizPersistFormSingleChoiceQuestionFactory } from './quiz-persist-form-single-choice-question.factory';
import { QuizPersistFormMultipleChoiceQuestionFactory } from './quiz-persist-form-multiple-choice-question.factory';
import { QuizPersistFormGroup } from '../form/quiz-persist.form-group';
import { QuizPersistSingleChoiceQuestionFormGroup } from '../form/quiz-persist-single-choice-question.form-group';
import { QuizPersistMultipleChoiceQuestionFormGroup } from '../form/quiz-persist-multiple-choice-question.form-group';
import { QuizCopyMode } from '../../quizzes/enums/quiz-copy-mode.enum';
import { ITimeSpanFormControl } from '../../../../../common/interfaces/time-span-form-control.interface';
import { TimeSpanValidators } from '../../../../../common/components/time-span/validators/time-span.validators';
import { QuizPersistConstants } from '../constants/quiz-persist.constants';
import { QuizPersistHeaderValidators } from '../validators/quiz-persist-header.validators';
import { QuizPersistValidators } from '../validators/quiz-persist.validators';
import { QuizPersistOpenQuestionFormGroup } from '../form/quiz-persist-open-question.form-group';

export namespace QuizPersistFormFactory {
  export function Create(response?: QuizDetailsResponse): QuizPersistFormGroup {
    return new QuizPersistFormGroup(
      {
        title: new FormControl(response?.title ?? '', {
          nonNullable: true,
          validators: [
            Validators.required,
            Validators.minLength(QuizPersistConstants.MinTitleLength),
            Validators.maxLength(QuizPersistConstants.MaxTitleLength),
          ],
        }),
        description: new FormControl(response?.title, {
          validators: [Validators.maxLength(QuizPersistConstants.MaxDescriptionLength)],
        }),
        duration: new FormGroup<ITimeSpanFormControl>(
          {
            hours: new FormControl(response?.duration.hours, {
              validators: [Validators.required],
            }),
            minutes: new FormControl(response?.duration.minutes, {
              validators: [Validators.required],
            }),
            seconds: new FormControl(response?.duration.seconds, {
              validators: [Validators.required],
            }),
          },
          [TimeSpanValidators.MinValue({ minutes: 1 }), TimeSpanValidators.MaxValue({ hours: 3 })],
        ),
        questionsCountInRunningQuiz: new FormControl(response?.questionsCountInRunningQuiz, {
          validators: [
            Validators.required,
            Validators.min(QuizPersistConstants.MinQuestionsCountInRunningQuiz),
            QuizPersistHeaderValidators.MaxQuestionsCountInRunningQuiz(),
          ],
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
        openQuestions: new FormArray<QuizPersistOpenQuestionFormGroup>(
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
      },
      [QuizPersistValidators.ThereIsAtLeastOneQuestion(), QuizPersistValidators.QuestionsAreUnique()],
    );
  }
}
