import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../src/environments/environment.development';
import { isDefined } from '../utils/utils';

export abstract class BaseApiService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _apiUrl = environment.apiUrl;

  protected get<T>(
    url: string,
    map: (response: T) => T,
    request?: object,
  ): Promise<T> {
    return firstValueFrom(
      this._httpClient.get<T>(`${this._apiUrl}${url}`, {
        params: isDefined(request) ? { ...request } : {},
      }),
    ).then((r) => map(r));
  }
}
