import { IQuizPersistFormOpenQuestion } from '../interfaces/quiz-persist-form-open-question.interface';
import { QuizPersistQuestionFormGroup } from '../contexts/quiz-persist-question.form-group';
import { QuizPersistSingleChoiceQuestionFormGroup } from '../contexts/quiz-persist-single-choice-question.form-group';
import { QuizPersistMultipleChoiceQuestionFormGroup } from '../contexts/quiz-persist-multiple-choice-question.form-group';

export type QuizPersistFormQuestion =
  | QuizPersistQuestionFormGroup<IQuizPersistFormOpenQuestion>
  | QuizPersistSingleChoiceQuestionFormGroup
  | QuizPersistMultipleChoiceQuestionFormGroup;
