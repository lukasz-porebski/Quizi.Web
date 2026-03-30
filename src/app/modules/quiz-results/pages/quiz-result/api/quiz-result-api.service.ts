import { Injectable } from '@angular/core';
import type {
  QuizResultDetailsRawResponse,
  QuizResultDetailsResponse,
} from '@app/modules/quiz-results/pages/quiz-result/api/responses/quiz-result-details.response';
import { BaseApiService, PeriodViewModel, TimeSpanModel } from 'lp-common';

@Injectable()
export class QuizResultApiService extends BaseApiService {
  public getDetails(id: string): Promise<QuizResultDetailsResponse> {
    return this.get<QuizResultDetailsResponse, QuizResultDetailsRawResponse>(
      `quiz-results/details/${id}`,
      (response) => {
        const result: QuizResultDetailsResponse = {
          ...response,
          quizRunningPeriod: new PeriodViewModel(
            new Date(response.quizRunningPeriod.start),
            new Date(response.quizRunningPeriod.end),
          ),
          duration: TimeSpanModel.CreateByTimeSpan(response.duration),
          maxDuration: TimeSpanModel.CreateByTimeSpan(response.maxDuration),
        };
        return result;
      },
    );
  }
}
