import type { QuizCopyMode } from '@app/modules/quizzes/pages/quizzes/enums/quiz-copy-mode.enum';
import type { TimeSpan } from 'lp-common';

export interface QuizSettingsPersistRequest {
  readonly duration: TimeSpan;
  readonly questionsCountInRunningQuiz: number;
  readonly randomQuestions: boolean;
  readonly randomAnswers: boolean;
  readonly negativePoints: boolean;
  readonly copyMode: QuizCopyMode;
}
