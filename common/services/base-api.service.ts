import { HttpClient, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '@env/environment.development';
import { isDefined } from '@common/utils/utils';

type Primitive = string | number | boolean | null | undefined;

export abstract class BaseApiService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _apiUrl = environment.apiUrl;

  protected get<TResponse, TRawResponse = TResponse>(
    url: string,
    map: (response: TRawResponse) => TResponse,
    request?: object,
  ): Promise<TResponse> {
    return firstValueFrom(
      this._httpClient.get<TRawResponse>(`${this._apiUrl}${url}`, {
        params: this._toHttpParams(isDefined(request) ? { ...request } : {}),
      }),
    ).then((r) => map(r));
  }

  protected post<TRequest, TResponse = void, TRawResponse = TResponse>(
    url: string,
    request?: TRequest,
    map?: (response: TRawResponse) => TResponse,
    options?: {
      responseType?: 'json' | 'text';
      withCredentials?: boolean;
      skipApiUrl?: boolean;
    },
  ): Promise<TResponse> {
    const urlPrefix = options?.skipApiUrl ? '/' : this._apiUrl;
    return firstValueFrom(
      this._httpClient.post<TRawResponse>(`${urlPrefix}${url}`, request, {
        responseType: options?.responseType ?? ('json' as any),
        withCredentials: options?.withCredentials,
      }),
    ).then((r) => (isDefined(map) ? map(r) : (r as unknown as TResponse)));
  }

  protected patch<TRequest, TResponse = void, TRawResponse = TResponse>(
    url: string,
    request?: TRequest,
    map?: (response: TRawResponse) => TResponse,
  ): Promise<TResponse> {
    return firstValueFrom(this._httpClient.patch<TRawResponse>(`${this._apiUrl}${url}`, request)).then((r) =>
      isDefined(map) ? map(r) : (r as unknown as TResponse),
    );
  }

  protected delete<TResponse = void, TRawResponse = TResponse>(
    url: string,
    map?: (response: TRawResponse) => TResponse,
  ): Promise<TResponse> {
    return firstValueFrom(this._httpClient.delete<TRawResponse>(`${this._apiUrl}${url}`)).then((r) =>
      isDefined(map) ? map(r) : (r as unknown as TResponse),
    );
  }

  private _toHttpParams(request: any, parentKey?: string, params = new HttpParams()): HttpParams {
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
            params = this._toHttpParams(v, `${fullKey}[${value.indexOf(v)}]`, params);
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
