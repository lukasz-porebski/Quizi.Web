import { Injectable } from '@angular/core';
import { BaseApiService } from '@common/services/base-api.service';
import type { LoginRequest } from '@common/identity/api/requests/login.request';
import type { AuthenticateResponse } from '@common/identity/api/responses/authenticate.response';

@Injectable({
  providedIn: 'root',
})
export class IdentityApiService extends BaseApiService {
  public login(request: LoginRequest): Promise<AuthenticateResponse> {
    return this.post('identity/login', request, undefined, {
      withCredentials: true,
    });
  }

  public refreshToken(): Promise<AuthenticateResponse> {
    return this.post('identity/refresh-token', undefined, undefined, {
      withCredentials: true,
    });
  }

  public logout(): Promise<void> {
    return this.post('identity/logout', undefined, undefined, {
      withCredentials: true,
    });
  }
}
