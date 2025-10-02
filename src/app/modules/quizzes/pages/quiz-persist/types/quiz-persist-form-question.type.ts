import { QuizPersistSingleChoiceQuestionFormGroup } from '../form/quiz-persist-single-choice-question.form-group';
import { QuizPersistMultipleChoiceQuestionFormGroup } from '../form/quiz-persist-multiple-choice-question.form-group';
import { QuizPersistOpenQuestionFormGroup } from '../form/quiz-persist-open-question.form-group';

export type QuizPersistFormQuestion =
  | QuizPersistOpenQuestionFormGroup
  | QuizPersistSingleChoiceQuestionFormGroup
  | QuizPersistMultipleChoiceQuestionFormGroup;
