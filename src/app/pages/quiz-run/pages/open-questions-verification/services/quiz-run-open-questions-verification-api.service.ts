import { Injectable } from '@angular/core';
import { BaseApiService } from '../../../../../../../common/services/base-api.service';
import { QuizOpenQuestionAnswerForVerificationResponse } from '../models/quiz-open-question-answer-for-verification.response';

@Injectable()
export class QuizRunOpenQuestionsVerificationApiService extends BaseApiService {
  public getOpenQuestionsAnswer(id: string): Promise<QuizOpenQuestionAnswerForVerificationResponse[]> {
    return this.get<QuizOpenQuestionAnswerForVerificationResponse[]>(
      `quizzes-verification/open-questions-answer/${id}`,
      (response) => response,
    );
  }
}
