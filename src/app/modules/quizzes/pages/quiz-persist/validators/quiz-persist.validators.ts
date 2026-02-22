import type { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import type { QuizPersistFormGroup } from '@app/modules/quizzes/pages/quiz-persist/form/quiz-persist.form-group';
import { isDefined, isEmpty } from '@common/utils/utils';
import type { IQuizPersistForm } from '@app/modules/quizzes/pages/quiz-persist/interfaces/quiz-persist-form.interface';
import type { QuizPersistFormQuestion } from '@app/modules/quizzes/pages/quiz-persist/types/quiz-persist-form-question.type';
import { QuizPersistFormQuestionType } from '@app/modules/quizzes/pages/quiz-persist/enums/quiz-persist-question-type.enum';
import type { QuizPersistSingleChoiceQuestionFormGroup } from '@app/modules/quizzes/pages/quiz-persist/form/quiz-persist-single-choice-question.form-group';
import type { QuizPersistMultipleChoiceQuestionFormGroup } from '@app/modules/quizzes/pages/quiz-persist/form/quiz-persist-multiple-choice-question.form-group';
import type { Optional } from '@common/types/optional.type';
import { unique } from 'remeda';
import type { QuizPersistOpenQuestionFormGroup } from '@app/modules/quizzes/pages/quiz-persist/form/quiz-persist-open-question.form-group';

export namespace QuizPersistValidators {
  export function ThereIsAtLeastOneQuestion(): ValidatorFn {
    return (control: AbstractControl<IQuizPersistForm>): ValidationErrors | null => {
      const form = control as unknown as QuizPersistFormGroup;
      if (!isDefined(form)) {
        return null;
      }

      return form.getQuestions().length >= 1 ? null : { minQuestionsCount: true };
    };
  }

  export function QuestionsAreUnique(): ValidatorFn {
    return (control: AbstractControl<IQuizPersistForm>): ValidationErrors | null => {
      const form = control as unknown as QuizPersistFormGroup;
      if (!isDefined(form)) {
        return null;
      }

      const questions = form.getQuestions();
      let isDuplicate = false;

      for (const question of questions) {
        const questionsWithoutGivenQuestion = questions.filter(
          (q) => q.value.ordinalNumber !== question.value.ordinalNumber,
        );
        if (questionsWithoutGivenQuestion.some((q) => areQuestionsSame(question, q))) {
          isDuplicate = true;
          break;
        }
      }

      return isDuplicate ? { questionsAreUnique: true } : null;
    };
  }

  function areQuestionsSame(first: QuizPersistFormQuestion, second: QuizPersistFormQuestion): boolean {
    if (first.value.text !== second.value.text) {
      return false;
    }

    const firstQuestionAnswers = getQuestionAnswers(first);
    const secondQuestionAnswers = getQuestionAnswers(second);

    if (
      isEmpty(firstQuestionAnswers) ||
      firstQuestionAnswers.some((a) => isEmpty(a)) ||
      isEmpty(secondQuestionAnswers) ||
      secondQuestionAnswers.some((a) => isEmpty(a))
    ) {
      return false;
    }

    const uniqueFirstQuestionAnswers = unique(firstQuestionAnswers);
    const uniqueSecondQuestionAnswers = unique(secondQuestionAnswers);
    if (
      uniqueFirstQuestionAnswers.length !== firstQuestionAnswers.length ||
      uniqueSecondQuestionAnswers.length !== secondQuestionAnswers.length
    ) {
      return false;
    }

    const allAnswers = firstQuestionAnswers.concat(secondQuestionAnswers);
    return (
      firstQuestionAnswers.length === secondQuestionAnswers.length &&
      unique(allAnswers).length === firstQuestionAnswers.length
    );
  }

  function getQuestionAnswers(question: QuizPersistFormQuestion): Optional<string>[] {
    switch (question.type) {
      case QuizPersistFormQuestionType.Open:
        return [(question as QuizPersistOpenQuestionFormGroup).value.answer];
      case QuizPersistFormQuestionType.SingleChoice:
        return (
          (question as QuizPersistSingleChoiceQuestionFormGroup).value.answers?.map((a) => a.text!) ?? []
        );
      case QuizPersistFormQuestionType.MultipleChoice:
        return (
          (question as QuizPersistMultipleChoiceQuestionFormGroup).value.answers?.map((a) => a.text!) ?? []
        );
    }
  }
}
