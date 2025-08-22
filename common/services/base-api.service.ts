import { HttpClient, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../src/environments/environment.development';
import { isDefined } from '../utils/utils';

type Primitive = string | number | boolean | null | undefined;

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
        params: this._toHttpParams(isDefined(request) ? { ...request } : {}),
      }),
    ).then((r) => map(r));
  }

  private _toHttpParams(
    request: any,
    parentKey?: string,
    params = new HttpParams(),
  ): HttpParams {
    if (request == null) return params;

    const isPrimitive = (v: any): v is Primitive =>
      ['string', 'number', 'boolean'].includes(typeof v) || v == null;

    Object.keys(request).forEach((key) => {
      const value = request[key];
      const fullKey = parentKey ? `${parentKey}.${key}` : key;

      if (Array.isArray(value)) {
        value.forEach((v) => {
          if (isPrimitive(v)) {
            params = params.append(fullKey, v as any);
          } else {
            params = this._toHttpParams(
              v,
              `${fullKey}[${value.indexOf(v)}]`,
              params,
            );
          }
        });
      } else if (isPrimitive(value)) {
        if (isDefined(value) && value !== '') {
          params = params.append(fullKey, value as any);
        }
      } else {
        params = this._toHttpParams(value, fullKey, params);
      }
    });

    return params;
  }
}
