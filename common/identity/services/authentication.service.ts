import { computed, inject, Injectable, signal } from '@angular/core';
import { IdentityApiService } from '@common/identity/api/identity-api.service';
import { AuthenticateResponse } from '@common/identity/api/responses/authenticate.response';
import { isDefined } from '@common/utils/utils';
import { Optional } from '@common/types/optional.type';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public readonly response = computed(() => this._response());
  public readonly isUserLoggedIn = computed(() => isDefined(this._response()));

  private readonly _api = inject(IdentityApiService);
  private readonly _response = signal<Optional<AuthenticateResponse>>(null);

  public async logIn(email: string, password: string): Promise<boolean> {
    return this._api
      .login({ email: email, password: password })
      .then((response) => {
        this._response.set(response);
        return true;
      })
      .catch(() => {
        this._response.set(undefined);
        return false;
      });
  }

  public async refresh(): Promise<void> {
    return this._api
      .refreshToken()
      .then((response) => {
        this._response.set(response);
      })
      .catch(() => this._response.set(undefined));
  }

  public async logOut(): Promise<void> {
    return await this._api.logout().then(() => {
      this._response.set(undefined);
    });
  }
}
