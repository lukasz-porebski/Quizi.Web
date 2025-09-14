import { IQuizPersistFormOpenQuestion } from '../interfaces/quiz-persist-form-open-question.interface';
import { QuizPersistQuestionFormGroup } from '../form/quiz-persist-question.form-group';
import { QuizPersistSingleChoiceQuestionFormGroup } from '../form/quiz-persist-single-choice-question.form-group';
import { QuizPersistMultipleChoiceQuestionFormGroup } from '../form/quiz-persist-multiple-choice-question.form-group';

export type QuizPersistFormQuestion =
  | QuizPersistQuestionFormGroup<IQuizPersistFormOpenQuestion>
  | QuizPersistSingleChoiceQuestionFormGroup
  | QuizPersistMultipleChoiceQuestionFormGroup;
