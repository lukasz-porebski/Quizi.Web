import { Component, inject } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { IdentityValidators } from '@app/modules/identity/validators/identity.validators';
import { IdentityUtils } from '@app/modules/identity/utils/identity.utils';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import type { IRegistrationForm } from '@app/modules/identity/pages/registration/interfaces/registration-form.interface';
import { RegistrationApiService } from '@app/modules/identity/pages/registration/api/registration-api.service';
import { RegistrationValidators } from '@app/modules/identity/pages/registration/validators/registration.validators';
import { Route } from '@app/core/enums/route.enum';
import { Router } from '@angular/router';
import type { ITextConfig } from '@lukasz-porebski/lp-common';
import {
  AsyncPageComponent,
  AuthenticationService,
  ButtonComponent,
  ButtonStyle,
  isDefined,
  TextInputComponent,
  TextInputType,
} from '@lukasz-porebski/lp-common';

@Component({
  selector: 'app-registration',
  imports: [AsyncPageComponent, ButtonComponent, MatCard, MatCardContent, TextInputComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  providers: [TranslatePipe, RegistrationApiService],
})
export class RegistrationComponent {
  private readonly _router = inject(Router);
  private readonly _registrationApiService = inject(RegistrationApiService);
  private readonly _authenticationService = inject(AuthenticationService);

  public readonly TextInputType = TextInputType;
  public readonly ButtonStyle = ButtonStyle;
  public readonly Validators = IdentityValidators;
  public readonly Utils = IdentityUtils;
  public readonly form = new FormGroup<IRegistrationForm>({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: IdentityValidators.Email(),
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: IdentityValidators.Password(),
    }),
    confirmedPassword: new FormControl<string>('', {
      nonNullable: true,
      validators: RegistrationValidators.ConfirmedPassword(),
    }),
  });

  public isLoading = false;

  public tryGetEmailAdditionalError(): ITextConfig | undefined {
    const control = this.form.controls.email;
    return control.hasError('emailIsTaken')
      ? {
          text: 'EMAIL_IS_TAKEN',
        }
      : undefined;
  }

  public tryGetConfirmedPasswordAdditionalError(): ITextConfig | undefined {
    const control = this.form.controls.confirmedPassword;
    const error = IdentityUtils.TryGetPasswordFormatError(control);
    if (isDefined(error)) {
      return error;
    }

    return control.hasError('confirmPassword')
      ? {
          text: 'PASSWORDS_ARE_DIFFERENT',
        }
      : undefined;
  }

  public async redirectToLogin(): Promise<void> {
    await this._router.navigateByUrl(Route.Login);
  }

  public async register(): Promise<void> {
    this.isLoading = true;
    await this._registrationApiService
      .register({
        email: this.form.value.email!,
        password: this.form.value.password!,
      })
      .then(() => this._authenticationService.logIn(this.form.value.email!, this.form.value.password!))
      .catch(() => {
        this.form.controls.email.setErrors({ emailIsTaken: true });
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
