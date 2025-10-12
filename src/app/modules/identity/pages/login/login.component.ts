import { Component, inject } from '@angular/core';
import { AsyncPageComponent } from '@common/components/async-page/async-page.component';
import { MatCard, MatCardContent } from '@angular/material/card';
import { TextInputComponent } from '@common/components/inputs/text/text.component';
import { FormControl, FormGroup } from '@angular/forms';
import { ILoginForm } from '@app/modules/identity/pages/login/interfaces/login-form.interface';
import { TextInputType } from '@common/components/inputs/text/enums/type.enum';
import { ButtonComponent } from '@common/components/button/button.component';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonStyle } from '@common/components/button/enums/style.enum';
import { IdentityValidators } from '@app/modules/identity/validators/identity.validators';
import { IdentityUtils } from '@app/modules/identity/utils/identity.utils';
import { AuthenticationService } from '@common/identity/services/authentication.service';
import { ITextConfig } from '@common/models/text.config';
import { Optional } from '@common/types/optional.type';
import { MatError } from '@angular/material/form-field';
import { Route } from '@app/core/enums/route.enum';
import { Router } from '@angular/router';

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
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [TranslatePipe],
})
export class LoginComponent {
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

  public invalidAuthData = false;

  private readonly _authenticationService = inject(AuthenticationService);
  private readonly _router = inject(Router);

  public tryGetInvalidAuthDataError(): Optional<ITextConfig> {
    return this.invalidAuthData ? { text: 'INVALID_EMAIL_OR_PASSWORD' } : undefined;
  }

  public async logIn(): Promise<void> {
    await this._authenticationService
      .logIn(this.form.value.email!, this.form.value.password!)
      .then((isValid) => {
        if (isValid) {
          this._router.navigate([`/${Route.Quizzes}`]);
        } else {
          this.invalidAuthData = true;
        }
      });
  }
}
