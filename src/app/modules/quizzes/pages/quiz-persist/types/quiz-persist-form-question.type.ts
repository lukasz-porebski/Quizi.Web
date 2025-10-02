import { QuizPersistSingleChoiceQuestionFormGroup } from '@app/modules/quizzes/pages/quiz-persist/form/quiz-persist-single-choice-question.form-group';
import { QuizPersistMultipleChoiceQuestionFormGroup } from '@app/modules/quizzes/pages/quiz-persist/form/quiz-persist-multiple-choice-question.form-group';
import { QuizPersistOpenQuestionFormGroup } from '@app/modules/quizzes/pages/quiz-persist/form/quiz-persist-open-question.form-group';

export type QuizPersistFormQuestion =
  | QuizPersistOpenQuestionFormGroup
  | QuizPersistSingleChoiceQuestionFormGroup
  | QuizPersistMultipleChoiceQuestionFormGroup;
