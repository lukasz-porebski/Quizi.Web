import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isDefined, isEmpty } from '../../../../../common/utils/utils';
import { QuizPersistFormQuestion } from '../types/quiz-persist-form-question.type';
import { QuizPersistFormQuestionType } from '../enums/quiz-persist-question-type.enum';
import { QuizPersistQuestionFormGroup } from '../form/quiz-persist-question.form-group';
import { IQuizPersistFormOpenQuestion } from '../interfaces/quiz-persist-form-open-question.interface';
import { QuizPersistSingleChoiceQuestionFormGroup } from '../form/quiz-persist-single-choice-question.form-group';
import { QuizPersistMultipleChoiceQuestionFormGroup } from '../form/quiz-persist-multiple-choice-question.form-group';
import { Optional } from '../../../../../common/types/optional.type';
import { unique } from 'remeda';
import { QuizPersistFormGroup } from '../form/quiz-persist.form-group';

export namespace QuizPersistQuestionValidators {
  export function QuestionsAreUnique(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const form = control.parent?.parent as unknown as QuizPersistFormGroup;
      if (!isDefined(form)) {
        return null;
      }

      const questions = form.getQuestions();
      const question = control as QuizPersistFormQuestion;
      const questionsWithoutGivenQuestion = questions.filter(
        (q) => q.value.ordinalNumber !== question.value.ordinalNumber,
      );
      return questionsWithoutGivenQuestion.some((q) => areQuestionsSame(question, q))
        ? { questionsAreUnique: true }
        : null;
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
        return [(question as QuizPersistQuestionFormGroup<IQuizPersistFormOpenQuestion>).value.answer];
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
