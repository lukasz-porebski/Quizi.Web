import { computed, inject, Injectable, signal } from '@angular/core';
import { IdentityApiService } from '@common/identity/api/identity-api.service';
import { AuthenticateResponse } from '@common/identity/api/responses/authenticate.response';
import { isDefined } from '@common/utils/utils';
import { Optional } from '@common/types/optional.type';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public readonly api = inject(IdentityApiService);
  public readonly isUserLoggedIn = computed(() => isDefined(this._response()));
  public readonly response = computed(() => this._response());

  private readonly _response = signal<Optional<AuthenticateResponse>>(null);

  public async logIn(email: string, password: string): Promise<boolean> {
    return this.api
      .login({ email: email, password: password })
      .then((response) => {
        this._response.set(response);
        return true;
      })
      .catch(() => false);
  }

  public async refresh(): Promise<void> {
    return this.api.refreshToken().then((response) => {
      this._response.set(response);
    });
  }

  public async logOut(): Promise<void> {
    return await this.api.logout().then(() => {
      this._response.set(undefined);
    });
  }
}
