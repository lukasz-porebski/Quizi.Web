import { sortBy } from 'remeda';
import type { IQuizRunForm } from '@app/modules/quizzes/pages/quiz-run/pages/run/interfaces/quiz-run-form.interface';
import type { IQuizRunFormOpenQuestion } from '@app/modules/quizzes/pages/quiz-run/pages/run/interfaces/quiz-run-form-question.interface';
import type { FormGroup } from '@angular/forms';

export namespace QuizRunQuestionsHelper {
  export function Merge(form: FormGroup<IQuizRunForm>): IQuizRunFormOpenQuestion[] {
    const result: IQuizRunFormOpenQuestion[] = [];
    form.controls.openQuestions.controls.forEach((c) => {
      result.push(c);
    });

    form.controls.singleChoiceQuestions.controls.forEach((c) => {
      result.push(c);
    });

    form.controls.multipleChoiceQuestions.controls.forEach((c) => {
      result.push(c);
    });

    return sortBy(result, (r) => r.ordinalNumber);
  }
}
