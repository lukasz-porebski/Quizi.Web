import type { QuizToRunResponse } from '@app/modules/quizzes/pages/quiz-run/pages/run/api/responses/quiz-to-run.response';
import { FormArray, FormGroup } from '@angular/forms';
import { QuizRunSingleChoiceQuestionFormControl } from '@app/modules/quizzes/pages/quiz-run/pages/run/form/quiz-run-single-choice-question-form.control';
import { QuizRunMultipleChoiceQuestionFormArray } from '@app/modules/quizzes/pages/quiz-run/pages/run/form/quiz-run-multiple-choice-question-form.array';
import { QuizRunOpenQuestionFormControl } from '@app/modules/quizzes/pages/quiz-run/pages/run/form/quiz-run-open-question-form.control';
import type { IQuizRunForm } from '@app/modules/quizzes/pages/quiz-run/pages/run/interfaces/quiz-run-form.interface';

export namespace QuizRunFormFactory {
  export function Create(response: QuizToRunResponse): FormGroup<IQuizRunForm> {
    return new FormGroup<IQuizRunForm>({
      openQuestions: new FormArray<QuizRunOpenQuestionFormControl>(
        response.openQuestions.map((q) => new QuizRunOpenQuestionFormControl(q)),
      ),
      singleChoiceQuestions: new FormArray<QuizRunSingleChoiceQuestionFormControl>(
        response.singleChoiceQuestions.map((q) => new QuizRunSingleChoiceQuestionFormControl(q)),
      ),
      multipleChoiceQuestions: new FormArray<QuizRunMultipleChoiceQuestionFormArray>(
        response.multipleChoiceQuestions.map((q) => new QuizRunMultipleChoiceQuestionFormArray(q)),
      ),
    });
  }
}
