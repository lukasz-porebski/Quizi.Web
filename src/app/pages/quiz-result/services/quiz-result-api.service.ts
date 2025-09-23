import { Injectable } from '@angular/core';
import {
  QuizResultDetailsRawResponse,
  QuizResultDetailsResponse,
} from '../models/responses/quiz-result-details.response';
import { BaseApiService } from '../../../../../common/services/base-api.service';
import { TimeSpanModel } from '../../../../../common/models/time-span.model';
import { PeriodViewModel } from '../../../../../common/models/views/period.view-model';

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
          maxDuration: TimeSpanModel.CreateByTimeSpan(response.maxDuration),
        };
        return result;
      },
    );
  }
}
