import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public get isUserLogIn(): boolean {
    return false;
  }

  public logout(): void {}
}
