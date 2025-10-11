import { Component } from '@angular/core';
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

@Component({
  selector: 'app-login',
  imports: [AsyncPageComponent, MatCard, MatCardContent, TextInputComponent, ButtonComponent],
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
}
