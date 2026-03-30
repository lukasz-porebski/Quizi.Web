import { Injectable } from '@angular/core';
import type { QuizOpenQuestionAnswerForVerificationResponse } from '@app/modules/quizzes/pages/quiz-run/pages/open-questions-verification/api/responses/quiz-open-question-answer-for-verification.response';
import { BaseApiService } from '@lukasz-porebski/lp-common';

@Injectable()
export class QuizRunOpenQuestionsVerificationApiService extends BaseApiService {
  public getOpenQuestionsAnswer(id: string): Promise<QuizOpenQuestionAnswerForVerificationResponse[]> {
    return this.get<QuizOpenQuestionAnswerForVerificationResponse[]>(
      `quizzes-verification/open-questions-answer/${id}`,
      (response) => response,
    );
  }
}
