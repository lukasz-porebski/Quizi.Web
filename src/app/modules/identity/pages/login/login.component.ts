import { Component, inject } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { FormControl, FormGroup } from '@angular/forms';
import type { ILoginForm } from '@app/modules/identity/pages/login/interfaces/login-form.interface';
import { TranslatePipe } from '@ngx-translate/core';
import { IdentityValidators } from '@app/modules/identity/validators/identity.validators';
import { IdentityUtils } from '@app/modules/identity/utils/identity.utils';
import { MatError } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { Route } from '@app/core/enums/route.enum';
import type { Optional } from '@lukasz-porebski/lp-common';
import {
  AsyncPageComponent,
  AuthenticationService,
  ButtonComponent,
  ButtonStyle,
  TextConfig,
  TextConfigTranslatePipe,
  TextInputComponent,
  TextInputType,
} from '@lukasz-porebski/lp-common';

@Component({
  selector: 'app-login',
  imports: [
    AsyncPageComponent,
    MatCard,
    MatCardContent,
    TextInputComponent,
    ButtonComponent,
    MatError,
    MatError,
    TextConfigTranslatePipe,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [TranslatePipe],
})
export class LoginComponent {
  private readonly _router = inject(Router);
  private readonly _authenticationService = inject(AuthenticationService);

  public readonly TextInputType = TextInputType;
  public readonly ButtonStyle = ButtonStyle;
  public readonly Validators = IdentityValidators;
  public readonly Utils = IdentityUtils;
  public readonly form = new FormGroup<ILoginForm>({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: IdentityValidators.Email(),
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: IdentityValidators.Password(),
    }),
  });

  public isLoading = false;
  public invalidAuthData = false;

  public tryGetInvalidAuthDataError(): Optional<TextConfig> {
    return this.invalidAuthData ? new TextConfig({ text: 'INVALID_EMAIL_OR_PASSWORD' }) : undefined;
  }

  public async redirectToRegistration(): Promise<void> {
    await this._router.navigateByUrl(Route.Registration);
  }

  public async logIn(): Promise<void> {
    this.isLoading = true;
    await this._authenticationService
      .logIn(this.form.value.email!, this.form.value.password!)
      .then((isValid) => {
        if (!isValid) {
          this.invalidAuthData = true;
        }
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
