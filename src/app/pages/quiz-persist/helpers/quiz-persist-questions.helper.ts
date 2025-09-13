import { QuizPersistContext } from '../contexts/quiz-persist.context';
import { QuizPersistFormQuestion } from '../types/quiz-persist-form-question.type';
import { sortBy } from 'remeda';

export namespace QuizPersistQuestionsHelper {
  export function Merge(context: QuizPersistContext): QuizPersistFormQuestion[] {
    const result: QuizPersistFormQuestion[] = [];
    context.form.controls.openQuestions.controls.forEach((c) => {
      result.push(c);
    });

    context.form.controls.singleChoiceQuestions.controls.forEach((c) => {
      result.push(c);
    });

    context.form.controls.multipleChoiceQuestions.controls.forEach((c) => {
      result.push(c);
    });

    return sortBy(result, (r) => r.controls.ordinalNumber.value);
  }
}
