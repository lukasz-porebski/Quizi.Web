import { Injectable } from '@angular/core';
import { BaseApiService } from '@common/services/base-api.service';
import type {
  QuizDetailsRawResponse,
  QuizDetailsResponse,
} from '@app/modules/quizzes/pages/quiz-persist/api/responses/quiz-details.response';
import { QuizCopyMode } from '@app/modules/quizzes/pages/quizzes/enums/quiz-copy-mode.enum';
import { TimeSpanModel } from '@common/models/time-span.model';
import type { QuizCreateRequest } from '@app/modules/quizzes/pages/quiz-persist/api/requests/quiz-create.request';
import type { QuizUpdateRequest } from '@app/modules/quizzes/pages/quiz-persist/api/requests/quiz-update.request';

@Injectable()
export class QuizPersistApiService extends BaseApiService {
  public create(request: QuizCreateRequest): Promise<void> {
    return this.post('quizzes/create', request);
  }

  public update(request: QuizUpdateRequest): Promise<void> {
    return this.patch('quizzes/update', request);
  }

  public getDetails(id: string): Promise<QuizDetailsResponse> {
    return this.get<QuizDetailsResponse, QuizDetailsRawResponse>(`quizzes/details/${id}`, (response) => {
      const result: QuizDetailsResponse = {
        ...response,
        duration: TimeSpanModel.CreateByTimeSpan(response.duration),
        copyMode: QuizCopyMode[response.copyMode as keyof typeof QuizCopyMode],
      };
      return result;
    });
  }
}
