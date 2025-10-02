import { Injectable } from '@angular/core';
import { BaseApiService } from '@common/services/base-api.service';
import { QuizOpenQuestionAnswerForVerificationResponse } from '@app/modules/quizzes/pages/quiz-run/pages/open-questions-verification/api/responses/quiz-open-question-answer-for-verification.response';

@Injectable()
export class QuizRunOpenQuestionsVerificationApiService extends BaseApiService {
  public getOpenQuestionsAnswer(id: string): Promise<QuizOpenQuestionAnswerForVerificationResponse[]> {
    return this.get<QuizOpenQuestionAnswerForVerificationResponse[]>(
      `quizzes-verification/open-questions-answer/${id}`,
      (response) => response,
    );
  }
}
