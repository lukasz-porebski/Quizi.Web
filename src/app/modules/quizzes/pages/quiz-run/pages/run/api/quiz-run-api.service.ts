import { Injectable } from '@angular/core';
import { BaseApiService } from '@common/services/base-api.service';
import {
  QuizToRunRawResponse,
  QuizToRunResponse,
} from '@app/modules/quizzes/pages/quiz-run/pages/run/api/responses/quiz-to-run.response';
import { TimeSpanModel } from '@common/models/time-span.model';
import { QuizVerifyRequest } from '@app/modules/quizzes/pages/quiz-run/pages/run/api/requests/quiz-verify.request';
import { AggregateId } from '@common/types/aggregate-id.type';

@Injectable()
export class QuizRunApiService extends BaseApiService {
  public verify(request: QuizVerifyRequest): Promise<AggregateId> {
    return this.post<QuizVerifyRequest, AggregateId>('quizzes-verification/verify', request, undefined, {
      responseType: 'text',
    });
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
