import { inject } from '@angular/core';
import { CanActivateChildFn } from '@angular/router';
import { AuthenticationService } from '@common/identity/services/authentication.service';

export const authenticationGuard: CanActivateChildFn = (route, state) => {
  const service = inject(AuthenticationService);
  return service.isUserLoggedIn();
};
