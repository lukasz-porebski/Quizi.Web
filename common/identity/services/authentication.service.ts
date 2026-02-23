import { computed, inject, Injectable, signal } from '@angular/core';
import { IdentityApiService } from '@common/identity/api/identity-api.service';
import type { AuthenticateResponse } from '@common/identity/api/responses/authenticate.response';
import { isDefined, isEmpty } from '@common/utils/utils';
import type { Optional } from '@common/types/optional.type';
import type { Permission } from '@app/core/enums/permission.enum';

interface JwtPayload {
  permissions: Optional<Permission | Permission[]>;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly _api = inject(IdentityApiService);

  public readonly response = computed(() => this._response());
  public readonly isUserLoggedIn = computed(() => isDefined(this._response()));
  public readonly permissions = computed<Permission[]>(() => {
    const token = this._response()?.accessToken;
    if (isEmpty(token)) {
      return [];
    }

    const permission = this._decodeToken(token!)?.permissions;
    if (isEmpty(permission)) {
      return [];
    }

    return Array.isArray(permission) ? permission : [permission!];
  });

  private readonly _response = signal<Optional<AuthenticateResponse>>(null);

  public hasPermission(permission: Permission): boolean {
    return this.permissions().includes(permission);
  }

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

  private _decodeToken(token: string): Optional<JwtPayload> {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decoded);
    } catch {
      return null;
    }
  }
}
