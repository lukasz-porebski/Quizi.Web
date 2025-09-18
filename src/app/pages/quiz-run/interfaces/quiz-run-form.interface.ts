import { FormArray } from '@angular/forms';
import { QuizRunSingleChoiceQuestionFormControl } from '../form/quiz-run-single-choice-question-form.control';
import { QuizRunMultipleChoiceQuestionFormArray } from '../form/quiz-run-multiple-choice-question-form.array';
import { QuizRunOpenQuestionFormControl } from '../form/quiz-run-open-question-form.control';

export interface IQuizRunForm {
  openQuestions: FormArray<QuizRunOpenQuestionFormControl>;
  singleChoiceQuestions: FormArray<QuizRunSingleChoiceQuestionFormControl>;
  multipleChoiceQuestions: FormArray<QuizRunMultipleChoiceQuestionFormArray>;
}
