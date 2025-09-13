import { IQuizPersistFormOpenQuestion } from '../interfaces/quiz-persist-form-open-question.interface';
import { IQuizPersistFormSingleChoiceQuestion } from '../interfaces/quiz-persist-form-single-choice-question.interface';
import { IQuizPersistFormMultipleChoiceQuestion } from '../interfaces/quiz-persist-form-multiple-choice-question.interface';
import { QuizPersistQuestionFormGroup } from '../contexts/quiz-persist-question.form-group';

export type QuizPersistFormQuestion =
  | QuizPersistQuestionFormGroup<IQuizPersistFormOpenQuestion>
  | QuizPersistQuestionFormGroup<IQuizPersistFormSingleChoiceQuestion>
  | QuizPersistQuestionFormGroup<IQuizPersistFormMultipleChoiceQuestion>;
