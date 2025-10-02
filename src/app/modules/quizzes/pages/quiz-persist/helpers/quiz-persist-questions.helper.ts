import { QuizPersistFormQuestion } from '../types/quiz-persist-form-question.type';
import { sortBy } from 'remeda';
import { QuizPersistFormGroup } from '../form/quiz-persist.form-group';

export namespace QuizPersistQuestionsHelper {
  export function Merge(form: QuizPersistFormGroup): QuizPersistFormQuestion[] {
    const result: QuizPersistFormQuestion[] = [];
    form.controls.openQuestions.controls.forEach((c) => {
      result.push(c);
    });

    form.controls.singleChoiceQuestions.controls.forEach((c) => {
      result.push(c);
    });

    form.controls.multipleChoiceQuestions.controls.forEach((c) => {
      result.push(c);
    });

    return sortBy(result, (r) => r.controls.ordinalNumber.value);
  }
}
