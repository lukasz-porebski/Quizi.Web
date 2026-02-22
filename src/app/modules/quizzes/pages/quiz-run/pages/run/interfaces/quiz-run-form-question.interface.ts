import type { QuizQuestionType } from '@app/core/enums/quiz-question-type.enum';

export interface IQuizRunFormOpenQuestion {
  readonly ordinalNumber: number;
  readonly text: string;
  readonly type: QuizQuestionType;
}
