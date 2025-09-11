import { Injectable } from '@angular/core';
import { BaseApiService } from '../../../../../common/services/base-api.service';
import { QuizDetailsResponse } from '../models/quiz-details.response';
import { QuizCopyMode } from '../../quizzes/enums/quiz-copy-mode.enum';

@Injectable()
export class QuizPersistApiService extends BaseApiService {
  public getDetails(id: string): Promise<QuizDetailsResponse> {
    return this.get<QuizDetailsResponse>(`quizzes/details/${id}`, (response) => {
      response.copyMode = QuizCopyMode[response.copyMode as unknown as keyof typeof QuizCopyMode];
      return response;
    });
  }
}
