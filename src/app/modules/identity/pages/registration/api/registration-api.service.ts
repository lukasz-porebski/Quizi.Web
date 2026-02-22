import { Injectable } from '@angular/core';
import { BaseApiService } from '@common/services/base-api.service';
import type { RegisterRequest } from '@app/modules/identity/pages/registration/api/requests/register.request';

@Injectable()
export class RegistrationApiService extends BaseApiService {
  public register(request: RegisterRequest): Promise<void> {
    return this.post('users/create', request, undefined, {
      withCredentials: true,
    });
  }
}
