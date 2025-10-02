import { QuizCopyMode } from '../../../quizzes/enums/quiz-copy-mode.enum';
import { TimeSpan } from '../../../../../../../../common/types/time-span.type';

export interface QuizSettingsPersistRequest {
  readonly duration: TimeSpan;
  readonly questionsCountInRunningQuiz: number;
  readonly randomQuestions: boolean;
  readonly randomAnswers: boolean;
  readonly negativePoints: boolean;
  readonly copyMode: QuizCopyMode;
}
