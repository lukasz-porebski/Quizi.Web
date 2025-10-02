import { Injectable } from '@angular/core';
import { BaseApiService } from '../../../../../../../common/services/base-api.service';
import { QuizDetailsRawResponse, QuizDetailsResponse } from '../models/responses/quiz-details.response';
import { QuizCopyMode } from '../../quizzes/enums/quiz-copy-mode.enum';
import { TimeSpanModel } from '../../../../../../../common/models/time-span.model';
import { QuizCreateRequest } from '../models/requests/quiz-create.request';
import { QuizUpdateRequest } from '../models/requests/quiz-update.request';

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
