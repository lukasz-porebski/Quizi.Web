import { FormArray } from '@angular/forms';
import { QuizRunSingleChoiceQuestionFormControl } from '@app/modules/quizzes/pages/quiz-run/pages/run/form/quiz-run-single-choice-question-form.control';
import { QuizRunMultipleChoiceQuestionFormArray } from '@app/modules/quizzes/pages/quiz-run/pages/run/form/quiz-run-multiple-choice-question-form.array';
import { QuizRunOpenQuestionFormControl } from '@app/modules/quizzes/pages/quiz-run/pages/run/form/quiz-run-open-question-form.control';

export interface IQuizRunForm {
  openQuestions: FormArray<QuizRunOpenQuestionFormControl>;
  singleChoiceQuestions: FormArray<QuizRunSingleChoiceQuestionFormControl>;
  multipleChoiceQuestions: FormArray<QuizRunMultipleChoiceQuestionFormArray>;
}
