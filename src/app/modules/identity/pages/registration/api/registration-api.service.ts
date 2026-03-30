import { Injectable } from '@angular/core';
import type { RegisterRequest } from '@app/modules/identity/pages/registration/api/requests/register.request';
import { BaseApiService } from '@lukasz-porebski/lp-common';

@Injectable()
export class RegistrationApiService extends BaseApiService {
  public register(request: RegisterRequest): Promise<void> {
    return this.post('users/create', request, undefined, {
      withCredentials: true,
    });
  }
}
