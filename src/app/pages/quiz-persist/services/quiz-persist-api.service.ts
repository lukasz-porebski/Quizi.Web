import { Injectable } from '@angular/core';
import { BaseApiService } from '../../../../../common/services/base-api.service';
import { QuizDetailsRawResponse, QuizDetailsResponse } from '../models/quiz-details.response';
import { QuizCopyMode } from '../../quizzes/enums/quiz-copy-mode.enum';
import { TimeSpanModel } from '../../../../../common/models/time-span.model';

@Injectable()
export class QuizPersistApiService extends BaseApiService {
  public getDetails(id: string): Promise<QuizDetailsResponse> {
    return this.get<QuizDetailsResponse, QuizDetailsRawResponse>(`quizzes/details/${id}`, (response) => {
      const result: QuizDetailsResponse = {
        ...response,
        duration: new TimeSpanModel(response.duration),
        copyMode: QuizCopyMode[response.copyMode as keyof typeof QuizCopyMode],
      };
      return result;
    });
  }
}
