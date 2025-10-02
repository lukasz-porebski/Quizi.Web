import { sortBy } from 'remeda';
import { IQuizRunForm } from '../interfaces/quiz-run-form.interface';
import { IQuizRunFormOpenQuestion } from '../interfaces/quiz-run-form-question.interface';
import { FormGroup } from '@angular/forms';

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
