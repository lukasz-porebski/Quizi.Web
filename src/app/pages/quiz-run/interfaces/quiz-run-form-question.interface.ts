import { QuizQuestionType } from '../../../core/enums/quiz-question-type.enum';

export interface IQuizRunFormOpenQuestion {
  ordinalNumber: number;
  type: QuizQuestionType;
}
