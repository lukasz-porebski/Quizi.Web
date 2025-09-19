import { Injectable } from '@angular/core';
import { BaseApiService } from '../../../../../common/services/base-api.service';
import { QuizToRunRawResponse, QuizToRunResponse } from '../models/responses/quiz-to-run.response';
import { TimeSpanModel } from '../../../../../common/models/time-span.model';
import { QuizVerifyRequest } from '../models/requests/quiz-verify.request';

@Injectable()
export class QuizRunApiService extends BaseApiService {
  public verify(request: QuizVerifyRequest): Promise<void> {
    return this.post('quizzes-verification/verify', request);
  }

  public getQuizToRun(id: string): Promise<QuizToRunResponse> {
    return this.get<QuizToRunResponse, QuizToRunRawResponse>(
      `quizzes-verification/quiz-to-run/${id}`,
      (response) => {
        const result: QuizToRunResponse = {
          ...response,
          duration: TimeSpanModel.CreateByTimeSpan(response.duration),
        };
        return result;
      },
    );
  }
}
